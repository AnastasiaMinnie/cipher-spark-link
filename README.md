# Cipher Spark Link

A privacy-preserving aid platform using Fully Homomorphic Encryption (FHE) technology. Beneficiaries can submit encrypted applications while donors verify needs without exposing personal details.

## 🎥 Demo

**Live Demo:** [https://cipher-spark-link.vercel.app/](https://cipher-spark-link.vercel.app/)

**Video Demonstration:**

[Watch Demo Video](./demo.mp4)

> 📹 **Note**: Click the link above to download and watch the demo video, or view it directly on GitHub after cloning the repository.

## ✨ Features

### HelpCrypt - Privacy-Preserving Aid Platform
- **Encrypted Applications**: Beneficiaries submit aid requests with encrypted personal information
- **FHE Verification**: Donors verify application legitimacy without viewing sensitive data
- **Privacy Protection**: All personal details remain encrypted using Zama's FHE technology
- **On-Chain Donations**: Direct, transparent donations with full privacy guarantees
- **Application Management**: Track application status (Pending, Verified, Rejected, Funded, Cancelled)

### FHECounter - Educational Example
- **Encrypted Counter**: Demonstrates basic FHE operations
- **Increment/Decrement**: Perform arithmetic on encrypted values
- **Reset Functionality**: Initialize counter to encrypted zero
- **Event Emissions**: Track all counter operations on-chain

## 🏗️ Architecture

### Smart Contracts

#### HelpCrypt.sol
Main contract implementing the privacy-preserving aid platform:
- **Submit Applications**: Users submit encrypted identity, reason, and amount
- **Verify Applications**: Community members verify applications without seeing raw data
- **Donate**: Contributors send funds to verified applications
- **Access Control**: Role-based encrypted data access
- **Security Features**: Reentrancy protection, input validation, optimized gas usage

#### FHECounter.sol
Educational contract demonstrating FHE operations:
- Encrypted counter with increment, decrement, and reset operations
- Access control for encrypted data
- Event-driven architecture

### Frontend (Next.js)
- **Modern UI**: Built with Next.js, React, and Tailwind CSS
- **Wallet Integration**: MetaMask connection via EIP-6963
- **FHE Integration**: Client-side encryption using fhEVM SDK
- **Real-time Updates**: Live application status tracking
- **Progress Visualization**: Donation progress bars and status badges

## 📦 Project Structure

```
cipher-spark-link/
├── contracts/              # Smart contracts
│   ├── FHECounter.sol     # FHE counter example
│   └── HelpCrypt.sol      # Main aid platform contract
├── deploy/                # Deployment scripts
│   ├── deploy.ts          # FHECounter deployment
│   └── deployHelpCrypt.ts # HelpCrypt deployment
├── test/                  # Test suites
│   ├── FHECounter.ts      # Counter tests
│   ├── HelpCrypt.ts       # Platform tests
│   ├── FHECounterSepolia.ts
│   └── HelpCryptSepolia.ts
├── tasks/                 # Hardhat tasks
│   ├── FHECounter.ts
│   ├── HelpCrypt.ts
│   └── accounts.ts
├── frontend/              # Next.js frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── fhevm/            # FHE integration
│   └── abi/              # Contract ABIs
├── hardhat.config.ts     # Hardhat configuration
└── demo.mp4             # Demo video
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager (or npm/yarn)
- **MetaMask**: Browser wallet extension

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AnastasiaMinnie/cipher-spark-link.git
   cd cipher-spark-link
   ```

2. **Install backend dependencies**

   ```bash
   pnpm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd frontend
   pnpm install
   cd ..
   ```

### Running Locally

1. **Start Hardhat node**

   ```bash
   npx hardhat node
   ```

2. **Deploy contracts** (in a new terminal)

   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Generate ABI files for frontend**

   ```bash
   cd frontend
   pnpm run genabi
   ```

4. **Start frontend development server**

   ```bash
   cd frontend
   pnpm run dev
   ```

5. **Open application**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Testing

**Run all tests:**
```bash
npm run test
```

**Run with coverage:**
```bash
npm run coverage
```

**Test specific contract:**
```bash
npx hardhat test test/HelpCrypt.ts
```

### Deployment to Sepolia

1. **Set environment variables**

   ```bash
   npx hardhat vars set MNEMONIC
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

2. **Deploy contracts**

   ```bash
   npx hardhat deploy --network sepolia
   ```

3. **Verify contracts**

   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

4. **Test on Sepolia**

   ```bash
   npx hardhat test --network sepolia
   ```

## 📜 Available Scripts

### Backend

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run compile`  | Compile all smart contracts          |
| `npm run test`     | Run test suite                       |
| `npm run coverage` | Generate test coverage report        |
| `npm run lint`     | Run linting checks (Solidity & TS)   |
| `npm run clean`    | Clean build artifacts                |
| `npm run typechain`| Generate TypeScript contract types   |
| `npm run node`     | Start local Hardhat node             |

### Frontend

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm run dev`     | Start development server             |
| `pnpm run build`   | Build for production                 |
| `pnpm run start`   | Start production server              |
| `pnpm run lint`    | Run ESLint                           |
| `pnpm run genabi`  | Generate ABI files from contracts    |

## 🔐 Security Features

### Smart Contract Security
- ✅ **Reentrancy Protection**: Checks-Effects-Interactions pattern in donation flow
- ✅ **Input Validation**: Amount and data validation on all inputs
- ✅ **Access Control**: Modifier-based permission system
- ✅ **Gas Optimization**: Optimized storage layout and batch operations
- ✅ **Event Logging**: Comprehensive event emissions for tracking

### FHE Privacy
- 🔒 **End-to-End Encryption**: All sensitive data encrypted with FHE
- 🔒 **Zero Knowledge Verification**: Verify without decryption
- 🔒 **Selective Data Access**: Only authorized users can decrypt
- 🔒 **On-Chain Privacy**: Encrypted data stored on blockchain

## 🛠️ Technology Stack

### Backend
- **Solidity 0.8.27**: Smart contract language
- **Hardhat**: Development environment
- **fhEVM**: Fully Homomorphic Encryption for Ethereum
- **TypeScript**: Type-safe development
- **Chai**: Testing framework

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: UI component library
- **ethers.js**: Ethereum library
- **fhevmjs**: FHE client library

### Infrastructure
- **Zama fhEVM**: Homomorphic encryption protocol
- **Sepolia Testnet**: Ethereum test network
- **Vercel**: Frontend deployment
- **MetaMask**: Wallet integration

## 📚 Documentation

### FHEVM Resources
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [Zama fhEVM](https://github.com/zama-ai/fhevm)

### Contract Documentation
- Comprehensive NatSpec documentation in contract files
- Inline comments explaining FHE operations
- Test files demonstrating usage patterns

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: Report bugs or request features
- **FHEVM Documentation**: [docs.zama.ai](https://docs.zama.ai)
- **Zama Community**: [Zama Discord](https://discord.gg/zama)

## 🙏 Acknowledgments

- **Zama**: For the groundbreaking fhEVM technology
- **Hardhat**: For the excellent development framework
- **Next.js**: For the powerful React framework
- **OpenZeppelin**: For security best practices

---

**Built with ❤️ using Zama's FHE Technology**

*Privacy-preserving aid for a better world* 🌍
