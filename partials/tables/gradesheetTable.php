<div class="d-flex flex-wrap justify-content-between align-items-end mb-3">
    <div>
        <h4 class="fw-bold m-0 text-dark">Edit Gradesheet</h4>
        <p class="text-muted mb-0 small">COSC1046 • Fundamentals of Web Programming</p>
    </div>
    <div class="d-flex gap-2">
        <button class="btn btn-white border bg-white btn-sm text-secondary shadow-sm" data-bs-toggle="modal" data-bs-target="#gradeSettingsModal">
            Grade Settings
        </button>
        <button id="saveRecordsBtn" class="btn btn-outline-success btn-sm px-3 shadow-sm">
    Save Records
</button>

        <div>
            <input type="file" id="excelFileInput" accept=".xlsx,.xls,.csv" style="display: none;">
            <button onclick="document.getElementById('excelFileInput').click()" class="btn btn-primary btn-sm">
                Upload Excel
            </button>
        </div>

    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive" style="max-height: 280px; overflow-y: auto;">
            <table class="table table-bordered align-middle mb-0" id="gradesheetTable">
                <thead>
                    <tr>
                        <th class="text-start ps-3 align-middle bg-light text-center" rowspan="2" style="min-width: 200px;">
                            STUDENT ID
                        </th>
                        <th class="text-start ps-3 align-middle bg-light text-center" rowspan="2" style="min-width: 200px;">
                            STUDENT NAME
                        </th>
                        <th class="text-center header-midterms" id="midterm-main-header" colspan="4">MIDTERM PERIOD</th>
                        <th class="text-center header-finals" id="finals-main-header" colspan="4">FINAL PERIOD</th>
                        <th class="text-center bg-light align-middle" rowspan="2" style="width: 80px;">
                            FINAL<br>RATING
                        </th>
                    </tr>
                    <tr id="sub-headers-row">
                        <th class="text-center text-secondary bg-white">Quiz 1</th>
                        <th class="text-center text-secondary bg-white">Act 1</th>
                        <th class="text-center text-secondary bg-white">Exam</th>
                        <th class="text-center text-primary bg-light fw-bold">Grade</th>
                        <th class="text-center text-secondary bg-white">Quiz 1</th>
                        <th class="text-center text-secondary bg-white">Act 1</th>
                        <th class="text-center text-secondary bg-white">Exam</th>
                        <th class="text-center text-success bg-light fw-bold">Grade</th>
                    </tr>
                </thead>
                <tbody id="gradesheet-body">

                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include 'partials/modals/gradeSettingsModal.php'; ?>

<script src="js/spreadsheetMaker.js"></script>
<script src="js/fileUploadToSupabase.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>