#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

// ANSI color codes for console output
const colors = {
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    reset: '\x1b[0m'
};

// Ticket key pattern: word-number (e.g., F17UXTPC-2250, tere-1)
const ticketKeyPattern = /([A-Za-z0-9]+\-\d+)/;

// Parse arguments
const args = process.argv.slice(2)[0].trim().split(/\s+/);
const commitMsgFile = args[0];
const isTicketCheckEnabled = args.length > 1 ? !args[1].includes('--no-ticket-check') : true;

if (!commitMsgFile) {
    console.error('Error: Commit message file path is required');
    process.exit(1);
}

// Read commit message
let commitMsgLines;
try {
    const commitMsgContent = fs.readFileSync(commitMsgFile, 'utf8');
    commitMsgLines = commitMsgContent.split('\n');
} catch (error) {
    console.error('Error reading commit message file:', error.message);
    process.exit(1);
}

const msg = commitMsgLines[0];
const fullCommitMsg = commitMsgLines.join('\n');

// Get current branch name
function getCurrentBranch() {
    try {
        const branchName = execSync('git branch --show-current', { 
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
        }).trim();
        return branchName;
    } catch (error) {
        return '';
    }
}

// Extract ticket key from branch name or commit message
function extractTicketKey(text) {
    const match = text.match(ticketKeyPattern);
    return match ? match[1] : '';
}

// Check if commit message already contains the ticket key
function containsTicketKey(commitMessage, ticketKey) {
    if (!ticketKey) return false;
    const keyPattern = new RegExp(`\\[${ticketKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, 'i');
    return keyPattern.test(commitMessage);
}

// Main logic
const currentBranch = getCurrentBranch();
let ticketKey = extractTicketKey(currentBranch);

console.log(`Current branch: ${currentBranch}`);

if (!ticketKey) {
    ticketKey = extractTicketKey(fullCommitMsg);
    if (!ticketKey && isTicketCheckEnabled) {
        console.log(`${colors.yellow}Warning: No ticket key found in branch name or commit message${colors.reset}`);
        console.log(`${colors.yellow}The ticket key pattern is a word-number (e.g., F17UXTPC-2210, f17uxtpc-1978)${colors.reset}`);
        console.log(`${colors.yellow}Use --no-ticket-check flag to skip ticket validation${colors.reset}`);
        process.exit(1);
    }
}

console.log(`Detected ticket key: ${ticketKey}`);

// Check if ticket key is already in commit message
if (ticketKey && !containsTicketKey(fullCommitMsg, ticketKey)) {
    // Add ticket key to the end of commit message body
    const linesList = [...commitMsgLines];
    
    // Add empty line if the last line is not empty, then add the ticket key
    if (commitMsgLines.length > 0 && commitMsgLines[commitMsgLines.length - 1].trim() !== '') {
        linesList.push('');
    }
    linesList.push(`[${ticketKey}]`);
    
    // Write the updated commit message back to file
    try {
        fs.writeFileSync(commitMsgFile, linesList.join('\n'));
        console.log(`${colors.green}Added ticket key [${ticketKey}] to commit message body${colors.reset}`);
    } catch (error) {
        console.error('Error writing commit message file:', error.message);
        process.exit(1);
    }
} else if (ticketKey) {
    console.log(`${colors.green}Ticket key [${ticketKey}] already present in commit message${colors.reset}`);
}

process.exit(0);
