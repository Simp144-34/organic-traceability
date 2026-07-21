const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// FIXED: Environment variables are now on a single line joined by '&&' to prevent terminal syntax errors
const envVars = 'export PATH=$PATH:/workspaces/organic-traceability/fabric-samples/bin && export FABRIC_CFG_PATH=/workspaces/organic-traceability/fabric-samples/config && export CORE_PEER_TLS_ENABLED=true && export CORE_PEER_LOCALMSPID="Org1MSP" && export CORE_PEER_TLS_ROOTCERT_FILE=/workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt && export CORE_PEER_MSPCONFIGPATH=/workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp && export CORE_PEER_ADDRESS=localhost:7051';

// 1. Route to Register Crop
app.post('/api/add', (req, res) => {
    const { id, name, owner, location } = req.body;
    const cmd = `${envVars} && peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /workspaces/organic-traceability/fabric-samples/test-network/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem -C mychannel -n vegcontract --peerAddresses localhost:7051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem --peerAddresses localhost:9051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem -c '{"function":"addVegetable","Args":["${id}", "${name}", "${owner}", "${location}"]}'`;
    
    exec(cmd, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ success: false, error: stderr });
        res.json({ success: true, message: "Asset added successfully!" });
    });
});

// 2. Route to Transfer Ownership
app.post('/api/transfer', (req, res) => {
    const { id, newOwner } = req.body;
    const cmd = `${envVars} && peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /workspaces/organic-traceability/fabric-samples/test-network/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem -C mychannel -n vegcontract --peerAddresses localhost:7051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/tlsca/tlsca.org1.example.com-cert.pem --peerAddresses localhost:9051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/tlsca/tlsca.org2.example.com-cert.pem -c '{"function":"transferVegetable","Args":["${id}", "${newOwner}"]}'`;
    
    exec(cmd, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ success: false, error: stderr });
        res.json({ success: true, message: "Ownership transferred successfully!" });
    });
});

// 3. Route to Get History
app.get('/api/history/:id', (req, res) => {
    const id = req.params.id;
    const cmd = `${envVars} && peer chaincode query -C mychannel -n vegcontract -c '{"function":"getVegetableHistory","Args":["${id}"]}'`;
    
    exec(cmd, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ success: false, error: stderr });
        try {
            res.json({ success: true, data: JSON.parse(stdout) });
        } catch (e) {
            res.json({ success: true, data: stdout }); // Fallback if not strictly JSON
        }
    });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 API Middleware running on port ${PORT}`));