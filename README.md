# 🌱 Organic Food Traceability System

An enterprise-grade supply chain tracking system built on **Hyperledger Fabric**. This application ensures the absolute authenticity of organic vegetables by securely tracking them from the original farm to the supermarket shelves. The data is immutable, meaning once a crop is registered, its history can never be altered or faked.

## 🚀 Features

This system is divided into four main real-world operations, all accessible via a unified web interface:

1. **Register New Crop (Farmer):** Agricultural workers create the initial unalterable asset on the blockchain, logging the Batch ID, Crop Name, Farmer Name, and Location.
2. **Transfer Ownership (Logistics/Retail):** As the crop moves through the supply chain, the blockchain tracks the chain of custody, securely updating the current owner (e.g., to a Supermarket).
3. **Trace Product History (Auditors):** Supply chain directors and auditors can query the ledger to view the complete, timestamped history of any batch.
4. **Consumer QR Sticker (End User):** Generates a scannable QR code for the physical product packaging. **Includes built-in blockchain validation** to ensure QR codes cannot be generated for fake or non-existent Batch IDs.

## 🏗️ Architecture & Tech Stack

* **Blockchain Network:** Hyperledger Fabric (Test Network)
* **Smart Contract (Chaincode):** JavaScript / Node.js
* **Middleware API:** Express.js & Node.js (Port 4000)
* **Frontend UI:** HTML5, Vanilla JavaScript, Tailwind CSS, QRCode.js (Port 3000)

---

## 🛠️ How to Run the Project (GitHub Codespaces)

To run the full environment, you will need to open **three separate terminals** in your Codespace to handle the Blockchain, the API, and the UI.

## Step 1 : Start the Hyperledger Fabric Network

Open **Terminal 1** and run the following commands to clear old data, start the network, create the channel, and deploy the smart contract:
cd /workspaces/organic-traceability/fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c mychannel
./network.sh deployCC -ccn vegcontract -ccp /workspaces/organic-traceability/chaincode/veg-contract -ccl javascript -c mychannel

## Step 2: Start the API Middleware Server

Open Terminal 2 and start the Node.js server that translates web requests into blockchain commands.
cd /workspaces/organic-traceability/api-server
node server.js
**Important: Go to your Codespaces "Ports" tab and ensure Port 4000 is set to Public.**

## Step 3: Start the Web UI

Open Terminal 3 and serve the frontend web page.
cd /workspaces/organic-traceability
npx serve .
**Important: Go to your Codespaces "Ports" tab, change Port 3000 to Public, and click the globe icon to open the web portal.**

## Run Locally (VS Code / Native Machine)

If you are running this project locally outside of Codespaces, please ensure your system meets the enterprise blockchain requirements.
Prerequisites

    Windows Users: Must install and run via WSL2 (Ubuntu).

    Mac/Linux Users: Native terminal is supported.

    Required Software: Docker Desktop, Node.js (v18+), Git.

## Step 1: Install Fabric Binaries

Hyperledger Fabric requires specific binaries and Docker images to run locally. Open your terminal in the root project folder and run:

curl -sSLO [https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh](https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh) && chmod +x install-fabric.sh
./install-fabric.sh docker samples binary

## Step 2: Update Hardcoded Paths

By default, the API server is configured for a Codespaces environment. You must update the file paths for your local machine:

    Open api-server/server.js.

    Find all instances of /workspaces/organic-traceability/...

    Replace them with the absolute path to where you cloned this repository on your local computer (e.g., /home/username/projects/organic-traceability/...).

    Update the API_URL inside index.html from the Codespace URL to http://localhost:4000/api.

## Step 3: Run the Terminals

Once dependencies are installed and paths are updated, follow the exact same 3-terminal process outlined in the Codespaces section above.


## Supply Chain Flow (Demo Guide)

    Farm Level: Open the UI and register a new asset (e.g., VEG001, Potato, Kendix, NewYork).

    Retail Level: Use the Transfer window to change the owner of VEG001 to City Mart.

    Verification: Use the History Search to view the immutable ledger data for VEG001.

    Consumer: Generate the QR Code for VEG001. Scan it with a mobile phone to see the consumer-facing verification process. (Note: The system will securely reject invalid IDs).
