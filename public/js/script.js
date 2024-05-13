async function startCamera() {
    await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ]);

    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    // Tambahkan event listener untuk menghentikan streaming saat video berhenti
    video.addEventListener('ended', () => {
        stream.getTracks().forEach(track => {
            track.stop();
        });
    });
}

async function registerFace() {
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    const video = document.getElementById('video');

    // Tambahkan variabel flag untuk menandai apakah wajah sudah terdeteksi
    let faceDetected = false;

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

        if (detections.length > 0 && !faceDetected) { // Jika wajah terdeteksi dan belum ada wajah yang terdeteksi sebelumnya
            const result = faceMatcher.findBestMatch(detections[0].descriptor);

            if (result.toString() !== 'unknown') { // Jika wajah terdeteksi sesuai dengan wajah yang didaftarkan
                const usernameInput = document.getElementById('usernameInput');
                const name = result.label; // Ambil hanya nama label
                usernameInput.value = name; // Masukkan nama label ke dalam input
                faceDetected = true; // Set flag menjadi true

                // Cek apakah input nama sudah terisi
                if (usernameInput.value.trim() !== '') {
                    // Jika sudah terisi, kirimkan form secara otomatis
                    const form = document.getElementById('registrationForm');
                    form.submit();
                }
            }
        }
    }, 100);
}

async function loadLabeledImages() {
    const labels = ['suhardi'];
    const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
            const imgUrl = `img/${label}.png`;
            const img = await faceapi.fetchImage(imgUrl);
            const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            if (!fullFaceDescription) {
                throw new Error(`Tidak ada wajah terdeteksi untuk ${label}`);
            }
            const faceDescriptors = [fullFaceDescription.descriptor];
            return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
        })
    );
    return labeledFaceDescriptors;
}

document.addEventListener('DOMContentLoaded', () => {
    startCamera();

    const registerBtn = document.getElementById('registerBtn');
    registerBtn.addEventListener('click', registerFace);
});
