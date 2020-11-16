
### API: FileReader

The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) 
    - stored on the user's computer, 
    - using File or Blob objects to specify the file or data to read.

File objects may be obtained from a FileList object 
    - returned as a result of a user selecting files using the <input> element, 
    - from a drag and drop operation's DataTransfer object, 
    - or from the mozGetAsFile() API on an HTMLCanvasElement.

---

### DataTransfer

The DataTransfer object is used to hold the data that is being dragged during a drag and drop operation. 

It may hold one or more data items, each of one or more data types. 

This object is available from the dataTransfer property of all drag events.

---

### Canvas `ctx.drawImage()` parameters

```
img	        Specifies the image, canvas, or video element to use	 
sx	        Optional. The x coordinate where to start clipping	
sy	        Optional. The y coordinate where to start clipping	
swidth	    Optional. The width of the clipped image	
sheight	    Optional. The height of the clipped image	
x	        The x coordinate where to place the image on the canvas	
y	        The y coordinate where to place the image on the canvas	
width	    Optional. The width of the image to use (stretch or reduce the image)	
height	    Optional. The height of the image to use (stretch or reduce the image)
```

---

### The `HTMLCanvasElement.toBlob()` method

 - creates a Blob object representing the image contained in the canvas; 
 
 - this file may be cached on the disk or stored in memory at the discretion of the user agent. 
 
 - If type is not specified, the image type is `image/png`. 
 

- The third argument is used when creating images using lossy compression 
    - (namely, image/jpeg) to specify the quality of the output.

`canvas.toBlob(callback, mimeType, qualityArgument);`

---

### `URL.revokeObjectURL()`

- The URL.revokeObjectURL() static method releases an existing object URL 
    - which was previously created by calling `URL.createObjectURL()`.  
    
- Call this method when you've finished using an object URL 
    - to let the browser know not to keep the reference to the file any longer.

---

