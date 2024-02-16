import Swal from 'sweetalert2';

export const SweetAlert = {
    Message: {
        //* Declare Message Property Here
        Success: ({ ...configs }) => {
            Swal.fire({
                icon: "success",
                position: 'center',
                timerProgressBar: true,
                timer: 6000,
                ...configs
            });
        },
        Error: ({ ...configs }) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                ...configs
            });
        },
        Warning: ({...configs}) => {
            Swal.fire({
                title: 'Bạn chắc chắn chứ?',
                text: "Bạn sẽ không thể thu hồi thao tác này!",
                icon: "warning",
                ...configs
            });
        }
    },
    Toast: {
        //* Declare Toast Property Here
        Success: ({...configs}) => {
            Swal.fire({
                toast: true,
                position: configs.position ?? 'top-right', // Use the passed parameter by user otherwise default value
                icon: "success",
                timerProgressBar: true,
                timer: 6000,
                ...configs
            });
        },
        Error: ({ ...configs }) => {
            Swal.fire({
                toast: true,
                position: configs.position ?? 'top-right', // Use the passed parameter by user otherwise default value
                target: 'body',
                icon: "error",
                ...configs
            });
        },
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
        }
    }
}
