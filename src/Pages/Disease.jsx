import { FaSave, FaInfoCircle } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { FaEye, FaPencil, FaTrashCan } from 'react-icons/fa6';

import { AgGridReact } from 'ag-grid-react'; //* React Grid Logic
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '../hooks';
import { getCurrentDate, generateRandomID } from '../utils/General';
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../Configs/firebase';
import { AlertNew } from '../utils/Alert';

//* Cell Rendering:Actions column
const Actions = (params) => {
    const { data } = params;
    const symptomsRef = collection(db, 'Symptoms'); //* Create a reference to the Symptoms collection

    const handleRemovePrescription = async () => {
        try {
            const { code } = data; // Take the code field in the document
            console.log(code);
            // Create a query against the collection.
            const q = query(symptomsRef, where('code', '==', code));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const { ref } = doc;
                deleteDoc(ref);
            });
            console.log('remove successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='flex items-center justify-between w-full h-full'>
            <button onClick={() => document.getElementById('detail_modal').showModal()}>
                <FaEye className='w-5 h-5 text-green-400' />
            </button>
            <button>
                <FaPencil className='w-5 h-5 text-yellow-400' />
            </button>
            <button onClick={handleRemovePrescription}>
                <FaTrashCan className='w-5 h-5 text-red-400' />
            </button>
        </div>
    );
};

const Disease = () => {
    const gridRef = useRef();
    const themeValue = useTheme();
    const generateID = generateRandomID().toUpperCase();
    const currentDate = getCurrentDate();

    const [prescription, setPrescription] = useState(''); //* Store detail data displayed in Detail Modal
    //! Consider remove line 35
    const [prescriptionRow, setPrescriptionRow] = useState([0]); //* Append Row when add medicine to prescription
    const [prescriptionDataArray, setPrescriptionDataArray] = useState([]); //* Save data to Session Storage
    const [medicines, setMedicines] = useState([]); //* Contain each medicine object after query them from reference in Symptoms Collection
    const [medicineList, setMedicineList] = useState([]); //* Store all medicines in db to display them in Create Modal

    //* Data of Prescription Form in a Single Row
    const prescriptionData = {
        name: useRef(null),
        concentration: useRef(null),
        usage: useRef(null),
    };

    //* Big Data Object (Entire Form)
    const data = {
        name: useRef(null),
        description: useRef(null),
        prescription: [],
    };

    const isFirstColumn = (params) => {
        const displayedColumns = params.api.getAllDisplayedColumns();
        const thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    };

    const checkboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    const headerCheckboxSelection = function (params) {
        //* we put checkbox on the name if we are not doing grouping
        return params.api.getRowGroupColumns().length === 0;
    };

    const onQuickFilterChanged = useCallback(() => {
        gridRef.current.api.setGridOption('quickFilterText', document.getElementById('quickFilter').value);
    }, []);

    //* Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {
            headerName: 'Mã đơn thuốc',
            field: 'code',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        { headerName: 'Loại bệnh', field: 'name', wrapText: true, filter: true },
        { headerName: 'Mô tả', field: 'description', wrapText: true, filter: true },
        { headerName: 'Ngày tạo', field: 'createdDate', wrapText: true, filter: true },
        { headerName: 'Ngày cập nhật mới nhất', field: 'updatedDate', wrapText: true, filter: true },
        {
            field: '',
            cellRenderer: Actions,
        },
    ]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefs2, setColDefs2] = useState([
        {
            headerName: 'Tên thuốc',
            field: 'name',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
        },
        { headerName: 'Triệu chứng', field: 'symptom', wrapText: true, filter: true },
        { headerName: 'Giá', field: 'cost', filter: true },
        { headerName: 'Liều lượng sử dụng', field: 'usage', wrapText: true, filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', wrapText: true, filter: true },
    ]);

    //* Column Definitions: Defines & controls grid columns.
    const [colDefsMedicineList, setColDefsMedicineList] = useState([
        {
            headerName: 'Tên thuốc',
            field: 'name',
            wrapText: true,
            autoHeight: true,
            pinned: 'left',
            filter: true,
        },
        { headerName: 'Triệu chứng', field: 'symptom', wrapText: true, minWidth: 180, filter: true },
        { headerName: 'Giá', field: 'cost', filter: true },
        { headerName: 'Liều lượng sử dụng', field: 'usage', wrapText: true, filter: true },
        { headerName: 'Thành phần dược', field: 'ingredient', wrapText: true, filter: true },
        { headerName: 'Số lượng tồn kho', field: 'existNumber', filter: true },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
            headerCheckboxSelectionFilteredOnly: true,
        };
    }, []);

    //* Make the AGGrid content automatically resize to fit the grid container size
    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    //! Consider remove this function
    const AppendPrescriptionRow = () => {
        setPrescriptionDataArray((prevData) => [
            ...prevData,
            {
                name: prescriptionData.name.current.value,
                concentration: prescriptionData.concentration.current.value,
                usage: prescriptionData.usage.current.value,
            },
        ]);
        setPrescriptionRow((prevData) => {
            return [...prevData, prevData.at(-1) + 1];
        });
    };

    //* Get Symptom List from Firebase Server (FireStore - Symptoms Collection)
    const getSymptomList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Symptoms'));
        querySnapshot.forEach((doc) => {
            const disease = doc.data();

            setRowData((prevData) => [
                ...prevData,
                {
                    name: disease.name,
                    description: disease.description,
                    code: disease.code,
                    createdDate: disease.createdDate,
                    updatedDate: disease.updatedDate,
                    prescriptions: disease.prescriptions,
                },
            ]);
        });
    };

    //* Get Medicine List from Firebase Server (FireStore - Medicines Collection)
    //* Used when user open the Create Modal in Disease Page and selected
    //* medicine in the table will be consider as medicine for that specific prescription
    const getMedicineList = async () => {
        const querySnapshot = await getDocs(collection(db, 'Medicines'));
        querySnapshot.forEach((doc) => {
            const medicine = doc.data();
            medicine.ref = doc.ref; //* Attach the ref property to object pass it as reference datatype to FireStore
            setMedicineList((prevData) => [...prevData, medicine]);
        });
    };

    const filterReferencePath = (selectedRow) => {
        const refList = []; //* Store reference instance from selected Medicine Row in Table
        selectedRow.forEach((item) => {
            const { ref } = item;
            refList.push(ref);
        });
        return refList;
    };

    const submitCreatedData = async () => {
        //* Get the selected row from Table using their API
        const selectedRow = gridRef.current.api.getSelectedRows();
        const refList = filterReferencePath(selectedRow);

        try {
            const docRef = await addDoc(collection(db, 'Symptoms'), {
                name: data.name.current.value,
                description: data.description.current.value,
                code: generateID,
                createdDate: currentDate,
                updatedDate: currentDate,
                prescriptions: [...refList],
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
            alert(e.message);
        }

        //* Use spread operator since when user done append the last item
        //* They won't click append row function so the latest row data is still not
        //* store in the useState but useRef is holding the lates data value
        // data.prescription = [
        //     ...prescriptionDataArray,
        //     {
        //         name: prescriptionData.name.current.value,
        //         concentration: prescriptionData.concentration.current.value,
        //         usage: prescriptionData.usage.current.value,
        //     },
        // ];

        // setRowData((prevData) => [
        //     ...prevData,
        //     {
        //         'Mã đơn thuốc': data.description.current.value,
        //         'Loại bệnh': data.name.current.value,
        //         'Ngày tạo': getCurrentDate(),
        //         'Đơn thuốc': data.prescription, //* we can store the data that do not rendered
        //     },
        // ]);
    };

    //TODO: Update logic of this function
    // const refreshData = () => {
    //     data.description.current.value = '';
    //     data.name.current.value = '';
    //     data.prescription = [];

    //     prescriptionData.name.current.value = '';
    //     prescriptionData.concentration.current.value = '';
    //     prescriptionData.usage.current.value = '';

    //     setPrescriptionRow([0]);
    // };

    const getPriceOfSingleMedicine = (medicineName) => {
        const medicineData = JSON.parse(sessionStorage.getItem('medicineData'));
        if (!medicineData) return;

        const result = medicineData.find((item) => {
            return item['Tên dược liệu'] === medicineName;
        });

        if (!result) return;

        return result['Giá dược liệu/viên'];
    };

    const mappingPriceForReceipt = () => {
        rowData.forEach((item) => {
            if (!item['Đơn thuốc']) return;

            item['Đơn thuốc'].forEach((singleDT) => {
                singleDT.price = getPriceOfSingleMedicine(singleDT.name) ?? 0;
            });
        });
    };

    //* If there is no document at the location referenced by docRef,
    //* the resulting document will be empty and calling exists on it
    //* will return false.
    const getMedicineFromReference = async (reference) => {
        const docRef = doc(db, reference.path);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
            return;
        }

        const medicine = docSnap.data();

        // Result: an Array of Object
        setMedicines((prevData) => [...prevData, medicine]);
    };

    const handleRowClicked = (event) => {
        //* Set medicine data to empty object otherwise
        //* it will keep the old data
        setMedicines([]);
        const { data } = event;

        if (data.prescriptions) {
            //* Query medicine data from reference object
            data.prescriptions.forEach((item) => {
                getMedicineFromReference(item);
            });
        }
        setPrescription(data);
    };

    const handleRemovePrescription = () => {
        console.log(prescription);
        //* Delete documents
        // await deleteDoc(doc(db, "Symptoms", "DC"));
    };

    //* Save the data to session storage when user append a new prescription
    //* So that we can use this data in the Receipt Page
    //! Note that: This is only temporary solution (later will use Server)
    useEffect(() => {
        mappingPriceForReceipt();

        const savedDiseaseData = JSON.stringify(rowData);
        sessionStorage.setItem('diseaseData', savedDiseaseData);

        const dialog = document.querySelector('#masterdata_disease_dialog');
        dialog.close();
        // refreshData();
    }, [rowData]);

    //* Get Symptom List when component first mounted
    //* The same for Medicine list since this will be displayed
    //* in the table inside Create Modal
    useEffect(() => {
        getSymptomList();
        getMedicineList();
    }, []);

    return (
        <div className='grid grid-cols-1 gap-4 md:gap-0'>
            <section className='col-span-1 mt-4'>
                <button
                    className='btn btn-success w-full'
                    onClick={() => document.getElementById('masterdata_disease_dialog').showModal()}
                >
                    Tạo mới dữ liệu
                </button>
            </section>

            <section className='col-span-1'>
                <div className='divider divider-primary w-full uppercase'>or</div>
            </section>

            {/* Table Section  */}
            <section className='col-span-1'>
                {/* Container with theme & dimensions */}
                <div
                    className={`col-span-3 ${themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'}`}
                    style={{ width: '100%', height: 450 }}
                >
                    <h3 className='font-extrabold text-3xl text-primary text-center uppercase mb-4'>
                        danh sách các đơn thuốc
                    </h3>

                    {/* The AG Grid component */}
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        autoSizeStrategy={autoSizeStrategy}
                        rowSelection={'multiple'}
                        rowGroupPanelShow={'always'}
                        pagination={true}
                        paginationPageSize={20}
                        paginationPageSizeSelector={[20, 50, 100]}
                        suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes.
                        onRowClicked={handleRowClicked}
                    />
                </div>
            </section>

            {/* Create Data Modal */}
            <dialog id='masterdata_disease_dialog' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <h3 className='font-bold text-2xl text-center mb-4 uppercase text-primary'>
                        form thêm mới đơn thuốc
                    </h3>

                    {/* MasterData Input */}
                    <div className='grid grid-cols-1'>
                        <section className='col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Tên triệu chứng</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập tên triệu chứng'
                                    className='input input-bordered w-full'
                                    ref={data.name}
                                />
                            </label>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Mô tả triệu chứng</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder='Vui lòng nhập mô tả triệu chứng'
                                    className='input input-bordered w-full'
                                    ref={data.description}
                                />
                            </label>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Mã đơn thuốc</span>
                                    <div
                                        className='tooltip tooltip-info tooltip-left'
                                        data-tip='Mã đơn thuốc được tạo tự động bởi hệ thống'
                                    >
                                        <FaInfoCircle className='w-4 h-4 text-sky-600 ' />
                                    </div>
                                </div>
                                <input
                                    type='text'
                                    disabled
                                    className='input input-bordered w-full'
                                    defaultValue={generateID}
                                />
                            </label>
                        </section>

                        <section className='col-span-1'>
                            <div className='divider divider-primary w-full uppercase'>or</div>
                        </section>

                        {/* Medicine List Section  */}
                        <section className='col-span-1'>
                            <h3 className='font-extrabold text-2xl text-primary text-center uppercase mb-4'>
                                danh sách dược liệu hiện có
                            </h3>

                            <div className='my-8'>
                                <label className='input input-bordered flex items-center gap-2'>
                                    <input
                                        type='text'
                                        className='grow'
                                        onInput={onQuickFilterChanged}
                                        id='quickFilter'
                                        placeholder='Tìm kiếm dược liệu...'
                                    />
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 16 16'
                                        fill='currentColor'
                                        className='w-4 h-4 opacity-70'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </label>
                            </div>

                            <div
                                className={`col-span-3 overflow-x-auto ${
                                    themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'
                                }`}
                                style={{ width: '100%', height: 450 }}
                            >
                                {/* The AG Grid component */}
                                <AgGridReact
                                    ref={gridRef}
                                    rowData={medicineList}
                                    columnDefs={colDefsMedicineList}
                                    defaultColDef={defaultColDef}
                                    autoSizeStrategy={autoSizeStrategy}
                                    rowSelection={'multiple'}
                                    rowMultiSelectWithClick={true}
                                    rowGroupPanelShow={'always'}
                                    pagination={true}
                                    paginationPageSize={20}
                                    paginationPageSizeSelector={[20, 50, 100]}
                                    suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes.
                                />
                            </div>
                        </section>
                    </div>

                    <div className='grid grid-cols-6 mt-8 gap-4 md:gap-8'>
                        <button className='btn btn-error col-span-6 md:col-span-2 order-2 md:order-1 uppercase'>
                            Làm mới dữ liệu
                            <GrPowerReset className='h-5 w-5' />
                        </button>
                        <button
                            className='btn btn-success col-span-6 md:col-span-4 order-1 md:order-2 uppercase'
                            onClick={submitCreatedData}
                        >
                            Lưu dữ liệu
                            <FaSave className='h-5 w-5' />
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Detail Data Modal  */}
            <dialog id='detail_modal' className='modal'>
                <div className='modal-box w-11/12 max-w-5xl'>
                    <form method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>

                    <h3 className='font-extrabold text-2xl text-center mb-4 uppercase text-primary'>
                        thông tin chi tiết đơn thuốc
                    </h3>

                    {/* MasterData Input */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Mã đơn thốc</span>
                                </div>
                                <input
                                    disabled
                                    defaultValue={prescription.code}
                                    type='text'
                                    placeholder='VD: 520H0659'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Triệu chứng bệnh</span>
                                </div>
                                <input
                                    type='text'
                                    disabled
                                    defaultValue={prescription.name}
                                    placeholder='VD: Sốt'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Ngày tạo đơn thuốc</span>
                                </div>
                                <input
                                    type='text'
                                    disabled
                                    defaultValue={prescription.createdDate}
                                    placeholder='VD: 1/1/2024'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                        <div className='col-span-2 xl:col-span-1'>
                            <label className='form-control w-full'>
                                <div className='label'>
                                    <span className='label-text'>Ngày cập nhật đơn thuốc mới nhất</span>
                                </div>
                                <input
                                    type='text'
                                    disabled
                                    defaultValue={prescription.updatedDate}
                                    placeholder='VD: 1/1/2024'
                                    className='input input-bordered w-full'
                                />
                            </label>
                        </div>
                        <div className='col-span-2'>
                            <textarea
                                disabled
                                placeholder='Mô tả triệu chứng bệnh'
                                defaultValue={prescription.description}
                                className='textarea textarea-bordered textarea-lg w-full'
                            ></textarea>
                        </div>
                        <div className='col-span-2'>
                            <div className='collapse collapse-arrow bg-base-200'>
                                <input type='checkbox' />
                                <div className='collapse-title text-xl font-medium'>
                                    Dược liệu được kê trong đơn thuốc
                                </div>
                                <div className='collapse-content'>
                                    <div
                                        className={`col-span-3 ${
                                            themeValue === 'light' ? 'ag-theme-quartz' : 'ag-theme-quartz-dark'
                                        }`}
                                        style={{ width: '100%', height: 450 }}
                                    >
                                        {/* The AG Grid component */}
                                        <AgGridReact
                                            rowData={medicines}
                                            columnDefs={colDefs2}
                                            autoSizeStrategy={autoSizeStrategy}
                                            rowSelection={'multiple'}
                                            rowGroupPanelShow={'always'}
                                            pagination={true}
                                            paginationPageSize={20}
                                            paginationPageSizeSelector={[20, 50, 100]}
                                            suppressScrollOnNewData={true} //* tells the grid to NOT scroll to the top when the page changes.
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Disease;
