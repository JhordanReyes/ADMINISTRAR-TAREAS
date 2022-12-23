import Swal from 'sweetalert2'

export const alertTop = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const alertCompleteForm = () => {
    Swal.fire({
        title: "Advertencia",
        text: "Debe completar el formulario",
        icon: "warning",
        confirmButtonText: "Completar"
    })
}