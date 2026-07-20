# organic-traceability
# 🌱 Organic Vegetable Traceability System on Hyperledger Fabric

A blockchain-based supply chain traceability system for organic vegetables built using **Hyperledger Fabric**, **Node.js (Smart Contract)**, and **Docker**. This system ensures complete transparency, immutability, and trust from farm to consumer.

---

## 🚀 Tech Stack
- **Blockchain Platform:** Hyperledger Fabric (v2.5.16)
- **Smart Contract Language:** Node.js (JavaScript)
- **Containerization:** Docker & Docker Compose
- **Environment:** GitHub Codespaces / Linux (Recommended for low-spec local machines)

---

## 📂 Project Directory Structure

```text
organic-traceability/
├── chaincode/
│   └── veg-contract/
│       ├── lib/
│       │   └── veg-contract.js   # Smart Contract business logic
│       ├── index.js              # Contract entry point
│       └── package.json          # Node.js dependencies
└── fabric-samples/               # Hyperledger Fabric test network & binaries

Set up and Installation Guide
1.Download Hyperledger Fabric Binaries & Docker Images
Run the following script in your terminal to pull the required Fabric tools and Docker images
curl -sSLO [https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh](https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh) && chmod +x install-fabric.sh
./install-fabric.sh docker samples binary
2.Start the Hyperledger Fabric Test Network & Create Channel
Navigate to the test-network directory, start the network, and create a channel named
cd fabric-samples/test-network
./network.sh up createChannel -c mychannel
3.Deploy the Smart Contract (Chaincode)
Deploy your Node.js-based organic vegetable contract (vegcontract) onto the channel
./network.sh deployCC -ccn vegcontract -ccp /workspaces/organic-traceability/chaincode/veg-contract -ccl javascript -c mychannel

How to Run & Test (CLI Commands)
Before running CLI commands, set up your environment variables for the CLI to communicate with Org1 -
export PATH=$PATH:/workspaces/organic-traceability/fabric-samples/bin
export FABRIC_CFG_PATH=/workspaces/organic-traceability/fabric-samples/config
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=/workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/peers/peer0.org1.example.com/tls/ca.crt](https://org1.example.com/peers/peer0.org1.example.com/tls/ca.crt)
export CORE_PEER_MSPCONFIGPATH=/workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/users/Admin@org1.example.com/msp](https://org1.example.com/users/Admin@org1.example.com/msp)
export CORE_PEER_ADDRESS=localhost:7051

1. Add a Vegetable (Invoke)
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /workspaces/organic-traceability/fabric-samples/test-network/organizations/ordererOrganizations/[example.com/tlsca/tlsca.example.com-cert.pem](https://example.com/tlsca/tlsca.example.com-cert.pem) -C mychannel -n vegcontract --peerAddresses localhost:7051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/tlsca/tlsca.org1.example.com-cert.pem](https://org1.example.com/tlsca/tlsca.org1.example.com-cert.pem) --peerAddresses localhost:9051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org2.example.com/tlsca/tlsca.org2.example.com-cert.pem](https://org2.example.com/tlsca/tlsca.org2.example.com-cert.pem) -c '{"function":"addVegetable","Args":["VEG001", "Tomato", "U Ba", "Shan State"]}'

2.Query Vegetable Details (Query)
Check the details and current owner of the vegetable :
peer chaincode query -C mychannel -n vegcontract -c '{"function":"queryVegetable","Args":["VEG001"]}'

3. Transfer Ownership (Invoke)
Update the owner when the product moves through the supply chain (e.g., transferred to "City Mart") :
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /workspaces/organic-traceability/fabric-samples/test-network/organizations/ordererOrganizations/[example.com/tlsca/tlsca.example.com-cert.pem](https://example.com/tlsca/tlsca.example.com-cert.pem) -C mychannel -n vegcontract --peerAddresses localhost:7051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org1.example.com/tlsca/tlsca.org1.example.com-cert.pem](https://org1.example.com/tlsca/tlsca.org1.example.com-cert.pem) --peerAddresses localhost:9051 --tlsRootCertFiles /workspaces/organic-traceability/fabric-samples/test-network/organizations/peerOrganizations/[org2.example.com/tlsca/tlsca.org2.example.com-cert.pem](https://org2.example.com/tlsca/tlsca.org2.example.com-cert.pem) -c '{"function":"transferVegetable","Args":["VEG001", "City Mart"]}'

Shutting Down the Network
To stop and clean up the Docker containers and network:
cd /workspaces/organic-traceability/fabric-samples/test-network
./network.sh down
