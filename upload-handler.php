<?php
// Set headers for JSON response
header('Content-Type: application/json');

// Supabase Configuration - **KEEP THESE SECURE** (e.g., use environment variables)
$SUPABASE_URL = 'https://pauthbxhwrrpaqrzsiji.supabase.co';
$SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdXRoYnhod3JycGFxcnpzaWppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUxMjUwNCwiZXhwIjoyMDgwMDg4NTA0fQ.uCZ4RhI_OT06uxGhJsZjqNmy-2qgqNv-Off-T8I8Pwg'; // Use a service key for server-side uploads
$BUCKET_NAME = 'WebProg'; // Your Supabase Storage bucket name

if (!isset($_FILES['excelFile']) || $_FILES['excelFile']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'No file uploaded or an upload error occurred.']);
    exit;
}

$file = $_FILES['excelFile'];
$fileName = basename($file['name']);
$filePathInBucket = 'uploads/' . time() . '_' . $fileName; // Unique path in bucket

// Read the file content
$fileContent = file_get_contents($file['tmp_name']);

// --- Supabase Upload Logic (Using cURL for a direct HTTP request) ---

$url = $SUPABASE_URL . '/storage/v1/object/' . $BUCKET_NAME . '/' . $filePathInBucket;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $fileContent);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $SUPABASE_KEY,
    'Content-Type: ' . $file['type'],
    'X-Upsert: true', // Optional: Overwrite if file exists
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Check for successful Supabase response (usually 200 or 201)
if ($http_code >= 200 && $http_code < 300) {
    // The file is now in your Supabase bucket
    // **NEXT STEP:** You'd typically call your grade processing logic here
    // e.g., read the excel/csv file, validate the data, and insert/update
    // the grades into your main Supabase Database (Postgres tables).

    echo json_encode([
        'success' => true,
        'message' => 'File uploaded successfully!',
        'storagePath' => $filePathInBucket
    ]);
} else {
    // Handle Supabase API error
    $response_data = json_decode($response, true);
    $error_message = $response_data['message'] ?? 'Supabase Storage error.';
    echo json_encode(['success' => false, 'message' => 'Supabase upload failed: ' . $error_message]);
}
?>