document.addEventListener('DOMContentLoaded', () => {
    
    // --- GLOBAL REFERENCES ---
    let currentRowBeingEdited = null;
    let currentSubjectCode = null; // Used for confirmation message

    // Main Modal References (Edit Modal)
    const tbody = document.querySelector('table tbody');
    const editSubjectModal = new bootstrap.Modal(document.getElementById('editSubjectModal'));
    const updateSubjectBtn = document.getElementById('update-subject-btn');

    // Confirmation Modal References (New Modal)
    const updateConfirmModal = new bootstrap.Modal(document.getElementById('updateConfirmModal'));
    const confirmUpdateBtn = document.getElementById('confirm-update-btn');
    const confirmSubjectCodeDisplay = document.getElementById('confirm-subject-code-display');

    // Input references (matching IDs in your modal HTML)
    const yearInput = document.getElementById('edit-year-input');
    const termInput = document.getElementById('edit-term-input');
    const codeInput = document.getElementById('edit-code-input');
    const subjectInput = document.getElementById('edit-subject-input');
    const studentsInput = document.getElementById('edit-students-input');
    const sectionInput = document.getElementById('edit-section-input');

    // --------------------------------------------------------
    // I. Populate Modal when 'Edit' Button is Clicked
    // --------------------------------------------------------
    tbody.addEventListener('click', event => {
        const editButton = event.target.closest('[data-bs-target="#editSubjectModal"]');
        if (!editButton) return;

        const row = editButton.closest('tr');
        if (!row) return;

        currentRowBeingEdited = row;

        const cells = row.querySelectorAll('td');
        const sectionSpan = cells[5].querySelector('span');

        const yearText = cells[0].textContent.trim();
        const termText = cells[1].textContent.trim();
        const codeText = cells[2].textContent.trim();
        const subjectText = cells[3].textContent.trim();
        const studentsText = cells[4].textContent.trim();
        const sectionText = sectionSpan?.textContent.trim() || cells[5].textContent.trim();

        // Load values into modal inputs
        yearInput.value = yearText;
        termInput.value = termText;
        codeInput.value = codeText;
        subjectInput.value = subjectText;
        studentsInput.value = studentsText;
        sectionInput.value = sectionText;

        // Store subject code for the confirmation modal
        currentSubjectCode = codeText;
    });

    // --------------------------------------------------------
    // II. Trigger Confirmation Modal on 'Save Changes' Click
    // --------------------------------------------------------
    updateSubjectBtn.addEventListener('click', () => {
        if (!currentRowBeingEdited) return;

        editSubjectModal.hide();
        confirmSubjectCodeDisplay.textContent = codeInput.value.trim();
        updateConfirmModal.show();
    });

    // --------------------------------------------------------
    // III. Finalize Update on 'Confirm Update' Click
    // --------------------------------------------------------
    confirmUpdateBtn.addEventListener('click', () => {
        if (!currentRowBeingEdited) return;

        const newYear = yearInput.value.trim();
        const newTerm = termInput.value.trim();
        const newCode = codeInput.value.trim();
        const newSubject = subjectInput.value.trim();
        const newStudents = studentsInput.value.trim();
        const newSection = sectionInput.value.trim();

        const cells = currentRowBeingEdited.querySelectorAll('td');
        cells[0].textContent = newYear;
        cells[1].textContent = newTerm;
        cells[2].textContent = newCode;
        cells[3].textContent = newSubject;
        cells[4].textContent = newStudents;

        // Update section cell with badge
        cells[5].innerHTML = `<span class="badge-soft">${newSection}</span>`;

        // Update data-subject-code for consistency with delete buttons
        const deleteButton = currentRowBeingEdited.querySelector('.delete-subject-btn');
        if (deleteButton) deleteButton.dataset.subjectCode = newCode;

        updateConfirmModal.hide();

        currentRowBeingEdited = null;
        currentSubjectCode = null;

        // TODO: AJAX call to update server
        console.log(`[SUCCESS] Subject ${newCode} updated in UI.`);
    });
});
