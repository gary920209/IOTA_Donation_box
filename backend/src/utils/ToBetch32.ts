import { bech32 } from 'bech32';
import { Utils } from '@iota/sdk';

// Function to convert a hex string to a byte array
function hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
}

// Function to convert Ed25519 address to Bech32
function ed25519ToBech32(ed25519Address: string, prefix: string): string {
    // Remove the '0x' prefix if it exists
    if (ed25519Address.startsWith('0x')) {
        ed25519Address = ed25519Address.slice(2);
    }

    // Convert hex address to byte array
    const bytes = hexToBytes(ed25519Address);

    // Encode to Bech32
    const words = bech32.toWords(bytes);
    return bech32.encode(prefix, words);
}

// Example usage
const ed25519Address = '0x60dd15382a13c51285398754923942aefbaece35d74b4761f0c0dda7741b89ed';
const prefix = 'tst1';
const test = 'tst1qpsd69fc9gfu2y598xr4fy3eg2h0htkwxht5k3mp7rqdmfm5rwy76fdvaj7'
const test1 = 'tst1qzwavrdmn8hlxj8us6fhn3k93wdd9depptvl8fzvl7qcg430s2thytd0xsk'
// const bech32Address = ed25519ToBech32(ed25519Address, prefix);
const bech32Address = Utils.parseBech32Address(test1)
console.log(bech32Address);
