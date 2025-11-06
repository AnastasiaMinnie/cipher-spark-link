// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title A simple FHE counter contract
/// @author fhevm-hardhat-template
/// @notice A very basic example contract showing how to work with encrypted data using FHEVM.
contract FHECounter is SepoliaConfig {
    euint32 private _count;

    /// @notice Event emitted when the counter is incremented
    event CounterIncremented(address indexed user);

    /// @notice Event emitted when the counter is decremented
    event CounterDecremented(address indexed user);

    /// @notice Event emitted when the counter is reset
    event CounterReset(address indexed user);

    /// @notice Returns the current encrypted count value
    /// @return The current encrypted count as euint32
    /// @dev The returned value is encrypted and can only be decrypted by authorized users
    function getCount() external view returns (euint32) {
        return _count;
    }

    /// @notice Increments the counter by a specified encrypted value.
    /// @param inputEuint32 the encrypted input value
    /// @param inputProof the input proof
    /// @dev This example omits overflow/underflow checks for simplicity and readability.
    /// In a production contract, proper range checks should be implemented.
    function increment(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedEuint32 = FHE.fromExternal(inputEuint32, inputProof);

        _count = FHE.add(_count, encryptedEuint32);

        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);

        emit CounterIncremented(msg.sender);
    }

    /// @notice Decrements the counter by a specified encrypted value.
    /// @param inputEuint32 the encrypted input value
    /// @param inputProof the input proof
    /// @dev This example omits overflow/underflow checks for simplicity and readability.
    /// In a production contract, proper range checks should be implemented.
    function decrement(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedEuint32 = FHE.fromExternal(inputEuint32, inputProof);

        _count = FHE.sub(_count, encryptedEuint32);

        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);

        emit CounterDecremented(msg.sender);
    }

    /// @notice Resets the counter to zero
    /// @param inputEuint32 the encrypted zero value
    /// @param inputProof the input proof
    function reset(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        euint32 encryptedZero = FHE.fromExternal(inputEuint32, inputProof);

        _count = encryptedZero;

        FHE.allowThis(_count);
        FHE.allow(_count, msg.sender);

        emit CounterReset(msg.sender);
    }
}
