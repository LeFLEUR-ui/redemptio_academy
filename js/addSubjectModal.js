document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save-new-subject').addEventListener('click', () => {
        const year = document.getElementById('new-year').value.trim();
        const term = document.getElementById('new-term').value.trim();
        const code = document.getElementById('new-code').value.trim();
        const title = document.getElementById('new-title').value.trim();
        const students = document.getElementById('new-students').value.trim();
        const section = document.getElementById('new-section').value.trim();

        if (!year || !term || !code || !title || !students || !section) {
            alert("Please complete all fields.");
            return;
        }

        const tableBody = document.querySelector("#subjectTable tbody");

        const newRow = `
            <tr>
                <td class="ps-4 fw-medium text-secondary">${year}</td>
                <td class="fw-semibold text-dark">${term}</td>
                <td class="fw-medium text-secondary">${code}</td>
                <td>${title}</td>
                <td class="fw-medium text-secondary">${students}</td>
                <td><span class="badge-soft">${section}</span></td>
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-link text-secondary" data-bs-toggle="modal" data-bs-target="#manageSubjectModal">Manage</button>
                    <button class="btn btn-sm btn-link text-warning" data-bs-toggle="modal" data-bs-target="#editSubjectModal">Edit</button>
                    <button class="btn btn-sm btn-link text-danger">Remove</button>
                </td>
            </tr>
        `;

        tableBody.insertAdjacentHTML('beforeend', newRow);

        ['new-year','new-term','new-code','new-title','new-students','new-section']
            .forEach(id => document.getElementById(id).value = '');
    });
});
