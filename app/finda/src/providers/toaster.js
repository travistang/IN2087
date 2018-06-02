export default class Toaster {
  static singleton = null

  static getInstance() {
    if(!Toaster.singleton) Toaster.singleton = new Toaster()
    return Toaster.singleton
  }
  constructor() {
    this.toastRef = null
  }

  setRef(ref) {
    this.toastRef = ref
  }

  toastSuccess(component,config = {closeButton: true}) {
    this.toastRef.success(component,config)
  }
  toastError(component,config = {closeButton: true}) {
    this.toastRef.error(component,config)
  }
  
  clearToast() {
    this.toastRef.clear()
  }
}
