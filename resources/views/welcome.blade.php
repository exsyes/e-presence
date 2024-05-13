<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script defer src="/dist/face-api.min.js"></script>
    <script defer src="/js/script.js"></script>
    <title>Face Recognition</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
<!-- Video feed from webcam -->
<div class="container-sm">
    <h3 class="text-center my-2">E-Presence <br>PPNPN KEJARI TANJABBAR</h3>
    <video id="video" width="300" height="200" autoplay muted class="d-block mx-auto"></video>
    <br>
    <div class="d-flex justify-content-center input-group">
        <form id="registrationForm" action="/login" method="get" class="text-center"> <!-- Ganti action dengan URL penanganan form Anda -->
           @csrf
            <input type="hidden" id="usernameInput" class="form-control" name="username" readonly placeholder="Nama">
            <button type="button" id="registerBtn" class="btn btn-primary">SUBMIT</button>
        </form>
    </div>

</div>

</body>
</html>
