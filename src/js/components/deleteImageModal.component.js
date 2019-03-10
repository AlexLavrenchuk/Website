export class DeleteImageModalComponent {
    constructor() {
        this._imageForDelete;
    }

    set imageForDelete(obj) {
        this._imageForDelete = obj;
    }

    async beforeRender() {

    }
    render() {
        return `
        <div class="modal" tabindex="-1" role="dialog" id="deleteImageModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete image</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Delete image id:${this._imageForDelete._id}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-denger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    afterRender() {
        
    }
}