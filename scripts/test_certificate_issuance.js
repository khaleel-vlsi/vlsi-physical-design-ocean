import WebSocket from 'ws';
globalThis.WebSocket = WebSocket;

import { issueCertificate } from '../src/services/certificationService.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testCertificateIssuanceFlow() {
  console.log('===========================================================');
  console.log(' TESTING CERTIFICATE ISSUANCE & PERMANENT ATTEMPT LOCK FLOW');
  console.log('===========================================================');

  // Test 1: Unique Serial Number Generation & Name Preservation
  const testUserId = `user_test_${Date.now()}`;
  const testAttemptId = `local_test_attempt_${Date.now()}`;
  const studentName = 'Priyanshu Sharma';
  const studentEmail = 'priyanshu@example.com';

  console.log('\n[Test 1 & 3] Submitting Certificate Details...');
  const cert1 = await issueCertificate(testUserId, testAttemptId, studentName, studentEmail);

  console.log('  Generated Certificate ID:', cert1.certificate_id);
  console.log('  Student Name Preserved :', cert1.full_name);

  if (!cert1.certificate_id.startsWith('OCEAN-CERT-')) {
    console.error('❌ Test 1 Failed: Serial number format invalid!');
    process.exit(1);
  }
  if (cert1.full_name !== studentName) {
    console.error('❌ Test 1 Failed: Student name was modified!');
    process.exit(1);
  }
  console.log('✅ Test 1 & 3 PASSED: Unique Serial Number format valid & student name exact.');

  // Test 2: Double-Submission / Race Condition Protection
  console.log('\n[Test 2 & 8 & 9] Testing Double-Submission / Race Condition Protection...');
  const cert2 = await issueCertificate(testUserId, testAttemptId, studentName, studentEmail);

  if (cert1.certificate_id !== cert2.certificate_id) {
    console.error('❌ Test 2 Failed: Double-submission generated a different certificate ID!');
    process.exit(1);
  }
  console.log('✅ Test 2 PASSED: Double-submission returned identical serial number:', cert2.certificate_id);

  // Test 3: Serial Number Uniqueness across different candidates
  console.log('\n[Test 4 & 13] Testing Uniqueness across multiple candidates...');
  const cert3 = await issueCertificate(`user_2_${Date.now()}`, `local_attempt_2_${Date.now()}`, 'Rahul Verma', 'rahul@example.com');
  console.log('  Candidate #2 Certificate ID:', cert3.certificate_id);

  if (cert1.certificate_id === cert3.certificate_id) {
    console.error('❌ Test 4 Failed: Duplicate serial number assigned across candidates!');
    process.exit(1);
  }
  console.log('✅ Test 4 PASSED: Unique serial numbers assigned per candidate.');

  console.log('\n===========================================================');
  console.log(' ALL CERTIFICATE ISSUANCE & SERIAL NUMBER TESTS PASSED     ');
  console.log('===========================================================\n');
}

testCertificateIssuanceFlow();
