import React, { Component } from 'react';
import ImageCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";


class ProfileImageUpload extends Component {
    state = {
        src: null,
        croppedImageUrl: null,
        croppedImageBlob: null,
        crop: {
          unit: "%",
          width: 70,
          aspect: 16 / 9
        },
        imageRef: null
      };

    onFileChange = (ev) => {
        ev.preventDefault();
        let files;
        if (ev.dataTransfer) {
           files = ev.dataTransfer.files;
        } else if (ev.target) {
           files = ev.target.files;
        }

        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ src: reader.result });
        };

        // !! Alternativa utilizand addEventListener 
        // (FileReader inherits from EventTarget)
        // reader.addEventListener("load", () =>
        //     this.setState({ src: reader.result })
        // );

        reader.readAsDataURL(files[0]);
    }

    onImageLoaded = (img) => {
        console.log('Image laoded: ', img)
        this.setState(() => ({ imageRef: img }));
    }
    onCropChange = (crop, percentCrop) => {
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };
    onCropComplete = (crop) => {
        this.makeCropImage(crop)
    }

    async makeCropImage(crop) {
        if (this.state.imageRef && crop.width && crop.height) {
          const [croppedImageUrl, croppedImageBlob] = await this.getCroppedImg(
            this.state.imageRef,
            crop,
            "new_image.jpeg"
          );

          this.setState({ croppedImageUrl, croppedImageBlob });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image,                    // original image
          crop.x * scaleX,          // clipping
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,                        // position 
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
                // rejecting promise
                // reject(new Error('Canvas is empty')); 
                console.error("Canvas is empty");
                return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.state.croppedImageUrl);
            let fileUrl = window.URL.createObjectURL(blob);
            
            resolve([fileUrl, blob]);
          }, "image/jpeg", 0.80);
        });
      }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="container">
                <div className="row">

                    <div className="col col-md-12">
                        <div className="card">
                            <div className="card-header">
                            <input type="file" className="form-control text-muted" onChange={ this.onFileChange } />
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="input-group">
                                    {   src && (
                                        <ImageCrop
                                            src={src}
                                            crop={crop}
                                            onImageLoaded={this.onImageLoaded}
                                            onComplete={this.onCropComplete}
                                            onChange={this.onCropChange}
                                        />
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted mb-0">Cropped:</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                            { croppedImageUrl && 
                                <img alt="Crop" 
                                    style={{ maxWidth: "100%" }} 
                                    src={croppedImageUrl} />
                            }
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="text-muted mb-0">Actions:</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {   croppedImageUrl && 
                                    <a  href={croppedImageUrl} download 
                                        className="btn btn-info btn-sm text-white">Download</a> }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default ProfileImageUpload;