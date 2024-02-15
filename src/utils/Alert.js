import Swal from 'sweetalert2';

export const Alert = ({ ...configs }) => {
    Swal.fire({
        position: 'top-right',
        timerProgressBar: true,
        timer: 3000,
        ...configs,
    });
};

export const AlertNew = {
    Confirm: async () => {
        const result = await Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể thu hồi thao tác này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Có, đã chắc chắn',
        });
        return result.isConfirmed;
    },
};
