<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h4 class="fw-bold m-0 text-dark">Subject Management</h4>
        <small class="text-muted">Overview of academic courses</small>
    </div>
    <div class="d-flex gap-2">
        <button class="btn btn-primary btn-sm px-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#addSubjectModal">
            + Add Subject
        </button>
    </div>
</div>

<div class="card mb-5">     
    <div class="table-responsive" style="max-height: 280px; overflow-y: auto;">
        <table id="subjectTable" class="table table-hover align-middle mb-0">
            <thead>
                <tr>
                    <th scope="col" class="ps-4">Year</th>
                    <th scope="col">Term no.</th>
                    <th scope="col">Code</th>
                    <th scope="col">Subject</th>
                    <th scope="col">No. of Students</th>
                    <th scope="col">Section</th>
                    <th scope="col" class="text-end pe-4">Actions</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>

<?php include 'partials/modals/addSubjectModal.php';?>
<?php include 'partials/modals/editSubjectModal.php';?>
<?php include 'partials/modals/manageSubjectModal.php';?>
<?php include 'partials/modals/deleteSubjectConfirmModal.php';?>
