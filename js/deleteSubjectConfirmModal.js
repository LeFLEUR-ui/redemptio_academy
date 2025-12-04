document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL VARIABLES to store the context of the pending deletion ---
    let currentRowToRemove = null;
    let currentSubjectCode = null;

    // --- Get the Modal Instance and its Confirm Button ---
    const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const subjectCodeDisplay = document.getElementById('subject-code-display');

    // --- 1. Event Delegation on Table Body (Trigger Modal) ---
    const tbody = document.querySelector('table tbody');

    tbody.addEventListener('click', event => {
        const button = event.target.closest('.delete-subject-btn');

        if (button) {
            event.preventDefault();

            // Store references for the final deletion step
            currentRowToRemove = button.closest('tr');
            currentSubjectCode = button.dataset.subjectCode;

            // Update the modal content with the subject code
            subjectCodeDisplay.textContent = currentSubjectCode;

            // Show the Bootstrap Modal
            deleteConfirmModal.show();
        }
    });

    // --- 2. Event Listener for the Confirmation Button Inside the Modal ---
    confirmDeleteBtn.addEventListener('click', () => {
        if (currentRowToRemove && currentSubjectCode) {
            // Perform the removal
            currentRowToRemove.remove();
            
            // Close the modal
            deleteConfirmModal.hide();
            
            // NOTE: Send AJAX request here to delete from the database.
            console.log(`[SUCCESS] Subject ${currentSubjectCode} deleted from UI. (Database deletion required next)`);

            // Reset global variables
            currentRowToRemove = null;
            currentSubjectCode = null;
        }
    });
});
