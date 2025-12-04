document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('excelFileInput');

    fileInput.addEventListener('change', function() {
        // Ensure a file was actually selected
        if (this.files.length > 0) {
            const selectedFile = this.files[0];
            
            // 1. You could add client-side validation here (e.g., check file size/type)
            if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && selectedFile.type !== 'text/csv') {
                alert('Please upload a valid Excel (.xlsx, .xls) or CSV (.csv) file.');
                // Optionally reset the input
                this.value = ''; 
                return;
            }

            // 2. Prepare the data for sending to the server
            const formData = new FormData();
            formData.append('excelFile', selectedFile);

            // 3. Send the file data to your PHP script
            uploadFileToServer(formData);
        }
    });
});

function uploadFileToServer(formData) {
    // Replace 'upload-handler.php' with the actual path to your server-side script
    fetch('upload-handler.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // File uploaded to Supabase successfully
            alert('File uploaded and gradesheet updated successfully!');
            // You might want to call another function here to process the file and update the gradesheet in the UI
        } else {
            alert('Upload failed: ' + (data.message || 'Unknown error.'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the upload process.');
    });
}