
## Upload Cropped Image to server

- we have a NodeJS Express Server with route

POST http://localhost:3344/upload

HEADER Content-Type: multipart/form-data

[{"key":"Content-Type","name":"Content-Type","value":"multipart/form-data","description":"","type":"text","enabled":true}]

BODY key=`image` value=`fisier_binar_imagine.jpg`


> ### 0. Pornim serverul Express pe portul 3344


---

> ### 1. Add `axios` and Upload button



---

> ### 2. Implement uploadImage handler

- adaugam state care sa mentina lista de imagini uploadate



---

> ### 3. Upload file and save to localStorage


---

> ### 4. Create download links with uploaded files




