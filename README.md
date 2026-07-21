# 🌱 Organic Food Traceability via Hyperledger Fabric

A Blockchain-based supply chain solution to track and trace organic vegetables from the farmer to the consumer using Hyperledger Fabric. 

This project ensures transparency, immutability, and trust in the organic food supply chain by recording every transfer of ownership on a distributed ledger.

## ✨ Features (Including New Updates)
1. **Asset Creation (`addVegetable`)**: Register a new batch of vegetables with details like origin, farmer name, and timestamp.
2. **Asset Transfer (`transferVegetable`)**: Transfer the ownership of the vegetables securely across the supply chain (e.g., Farmer -> Logistics -> Retailer).
3. **Traceability History (`getVegetableHistory`) [NEW 🚀]**: Fetch the complete, immutable lifecycle of the product to see every hand it has passed through.
4. **Consumer QR Code (`generate-qr.js`) [NEW 📱]**: Generates a scannable QR code in the terminal that simulates the consumer-facing app, allowing buyers to scan and view the product's origin.

---

## 🚀 How to Run the Demo (Step-by-Step)

Follow these steps to run the complete end-to-end flow in **GitHub Codespaces**.

### 1. Start the Blockchain Network
"bash

cd /workspaces/organic-traceability/fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c mychannel

2. Deploy the Smart Contract
"bash

./network.sh deployCC -ccn vegcontract -ccp /workspaces/organic-traceability/chaincode/veg-contract -ccl javascript -c mychannel

3. Set Environment Variables (Org1)
"bash

export PATH=$PATH:/workspaces/organic-traceability/fabric-samples/bin
export FABRIC_CFG_PATH=/workspaces/organic-traceability/fabric-samples/config
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/peers/peer0.org1.example.com/tls/ca.crt](https://org1.example.com/peers/peer0.org1.example.com/tls/ca.crt)
export CORE_PEER_MSPCONFIGPATH=/workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/users/Admin@org1.example.com/msp](https://org1.example.com/users/Admin@org1.example.com/msp)

4. Create a New Asset (Farmer)
"bash

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /workspaces/organic-traceability/fabric-samples/test-network/organizations/ordererOrganizations/[example.com/tlsca/tlsca.example.com-cert.pem](https://example.com/tlsca/tlsca.example.com-cert.pem) -C mychannel -n vegcontract --peerAddresses localhost:7051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/tlsca/tlsca.org1.example.com-cert.pem](https://org1.example.com/tlsca/tlsca.org1.example.com-cert.pem) --peerAddresses localhost:9051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org2.example.com/tlsca/tlsca.org2.example.com-cert.pem](https://org2.example.com/tlsca/tlsca.org2.example.com-cert.pem) -c '{"function":"addVegetable","Args":["VEG001", "Tomato", "U Ba", "Shan State"]}'
export CORE_PEER_ADDRESS=localhost:7051

5. Transfer Ownership (Retailer)
"bash

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /workspaces/organic-traceability/fabric-samples/test-network/organizations/ordererOrganizations/[example.com/tlsca/tlsca.example.com-cert.pem](https://example.com/tlsca/tlsca.example.com-cert.pem) -C mychannel -n vegcontract --peerAddresses localhost:7051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/tlsca/tlsca.org1.example.com-cert.pem](https://org1.example.com/tlsca/tlsca.org1.example.com-cert.pem) --peerAddresses localhost:9051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org2.example.com/tlsca/tlsca.org2.example.com-cert.pem](https://org2.example.com/tlsca/tlsca.org2.example.com-cert.pem) -c '{"function":"transferVegetable","Args":["VEG001", "City Mart"]}'

6. View Product History (Traceability)
"bash

peer chaincode query -C mychannel -n vegcontract -c '{"function":"getVegetableHistory","Args":["VEG001"]}'

7. Generate QR Code for Consumer Scanning
"Bash

cd /workspaces/organic-traceability/qr-app
node generate-qr.js VEG001

then Scan the generated Qr with your mobile phone to simulate the consumer verification process!

> **📝 Note on the QR Code & UI:** 
> Please note that this current phase of the project strictly focuses on the **Backend Blockchain Infrastructure** and Smart Contracts. 
> There is no Frontend Web UI built yet. The generated QR code currently points to a simulated URL (`https://my-organic-farm.com/...`) to demonstrate the consumer experience concept. Building a React/Next.js frontend application to connect with this blockchain network is planned as a future enhancement.

Common Issues & Troubleshooting

    peer: command not found: Ensure you have exported the PATH variable (Step 3).

    connection refused (localhost:7051): The Docker containers are stopped. Run ./network.sh down and then ./network.sh up createChannel -c mychannel to restart the network cleanly.

    
cd /workspaces/organic-traceability/fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c mychannel
