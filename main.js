let currentForm = 1;
const totalForms = 9;
let skippedForms = [];

document.getElementById("package").addEventListener("change", function () {
  const selectedPackage = this.value;
  
  // تحديد الفورمز اللي هتتعمل لها skip
  if (selectedPackage === "silver") {
    skippedForms = [6];
  } else if (selectedPackage === "bronze") {
    skippedForms = [6, 8];
  } else {
    skippedForms = [];
  }

  // إعادة ضبط الفورم المعروضة
  currentForm = 1;
  showForm(currentForm);
});

function showForm(index) {
  // تخطي الفورمز اللي في skippedForms
  while (skippedForms.includes(index)) {
    index++;
    if (index > totalForms) break;
  }
  currentForm = index;

  for (let i = 1; i <= totalForms; i++) {
    const form = document.getElementById(`form${i}`);
    if (i === currentForm) {
      form.classList.add("active");
    } else {
      form.classList.remove("active");
    }
  }

  const page1 = document.querySelector(".page1");
  const page2 = document.querySelector(".page2");
  const page3 = document.querySelector(".page3");
  const page4 = document.querySelector(".page4");

  [page1, page2, page3, page4].forEach(page => {
    page.style.display = "none";
  });

  if (currentForm === 1 || currentForm === 2) {
    page1.style.display = "block";
  } else if (currentForm === 3 || currentForm === 4) {
    page2.style.display = "block";
  } else if (currentForm === 5) {
    page3.style.display = "block";
  } else if (currentForm === 6 || currentForm === 7 || currentForm === 8) {
    page4.style.display = "block";
  } else if (currentForm === 9) {
    page3.style.display = "block";
    page4.style.display = "block";
  }
}

function nextForm() {
  let next = currentForm + 1;

  while (skippedForms.includes(next)) {
    next++;
  }

  if (next <= totalForms) {
    currentForm = next;
    showForm(currentForm);
  }
}

function prevForm() {
  let prev = currentForm - 1;

  while (skippedForms.includes(prev)) {
    prev--;
  }

  if (prev >= 1) {
    currentForm = prev;
    showForm(currentForm);
  }
}

function submitForm() {
  alert("Form submitted successfully!");
}

function format(command,editorId) {
    const editor=
    document.getElementById(editorId);
    if(editor){
        editor.focus();
    document.execCommand(command, false, null);
    }
  }
  
  function changeFontSize(value,editorId) {
    const editor=
    document.getElementById(editorId);
    if(editor){
        editor.focus();
    document.execCommand("fontSize", false, value);
    }
  }
  
  function changeFont(font,editorId) {
    const editor = document.getElementById(editorId);
    if (editor){
    editor.style.fontFamily = font;
    }
  }

  function playYouTubeSong() {
    const link = document.getElementById("youtubeLink").value;
    const time = document.getElementById("startTime").value || "0";
    const autoplay = document.getElementById("autoplay").checked;
  
    if (link) {
      const videoId = extractVideoId(link);
      const startSeconds = timeToSeconds(time);
      const src = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&autoplay=${autoplay ? 1 : 0}`;
  
      document.getElementById("youtubePlayer").innerHTML = 
       ` <iframe width="300" height="150" src="${src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
     ` ;
    }
  }
  
  function extractVideoId(url) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }
  
  function timeToSeconds(timeStr) {
    const parts = timeStr.split(":");
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    return minutes * 60 + seconds;
  }
  
  window.onload = function () {
    showForm(currentForm);
  };

  const segmentFormMap = {
    venue: "form1",
    date: "form2",
    time: "form3",
    timeEnd: "form4",
    saveDate: "form5",
    programme: "form6",
    counting: "form7"
  };
  
  function toggleFormsBasedOnSelect() {
    for (const segment in segmentFormMap) {
      const select = document.getElementById(segment);
      const formId = segmentFormMap[segment];
      const form = document.getElementById(formId);
  
      if (select && form) {
        if (select.value === "1") {
          form.style.display = "block";
        } else {
          form.style.display = "none";
        }
  
        select.addEventListener("input", () => {
          form.style.display = select.value === "1" ? "block" : "none";
        });
      }
    }
  }
  function formatDateTimeForPreview(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return ''; // في حال التاريخ مش متظبط

  let options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}
function formatLongDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return '';

  const options = {
    weekday: 'long',      // Sunday
     month: 'long',        // December
    day: '2-digit',       // 31
    year: 'numeric'       // 2026
  };

  return date.toLocaleDateString('en-US', options);
}
function formatTime(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleTimeString('en-US', options);
}

function updateDatePreview() {
  const dateInput = document.getElementById('eventDate').value;
  const formattedDate = formatDateTimeForPreview(dateInput);
  const longDate = formatLongDate(dateInput); 
    const time = formatTime(dateInput); // 🕒
  document.getElementById('datePreview').innerText = formattedDate;
  document.getElementById('datePreview').innerText = formattedDate;
   document.getElementById('longDatePreview').innerHTML = ` <strong>Date</strong><br> ${longDate} `;
  document.getElementById('timePreview').innerHTML = `<strong>Time</strong><br>${time}`;

}


  const inputs = document.querySelectorAll("input, textarea, select");
  function updatePreview() {
    document.getElementById("previeweventType").textContent = document.getElementById("eventType").value;
   document.getElementById("previewtypeOccasion").textContent = document.getElementById("typeOccasion").value;

    document.getElementById("previewnickName").textContent = document.getElementById("nickName").value;
    document.getElementById("previeweditorGreeting").innerHTML = document.getElementById("editorGreeting").innerHTML;
    document.getElementById("previeworganizerName1").textContent = document.getElementById("organizerName1").value;
        document.getElementById("previeworganizerName2").textContent = document.getElementById("organizerName2").value;

    document.getElementById("previeweditorPhrases").innerHTML = document.getElementById("editorPhrases").innerHTML;
    document.getElementById("previewfullOrganizerName").textContent = document.getElementById("fullOrganizerName").value;

    document.getElementById("previeweditorAddress").innerHTML = document.getElementById("editorAddress").innerHTML;
    document.getElementById("previeweditorProgramme").innerHTML = document.getElementById("editorProgramme").innerHTML;
    document.getElementById("previeweditorAdditionalInfo").innerHTML = document.getElementById("editorAdditionalInfo").innerHTML;
    document.getElementById("previewcontactName1").textContent = document.getElementById("contactName1").value;
    document.getElementById("previewcontactRelation1").textContent = document.getElementById("contactRelation1").value;

    document.getElementById("previewcontactName2").textContent = document.getElementById("contactName2").value;
    document.getElementById("previewcontactRelation2").textContent = document.getElementById("contactRelation2").value;
       document.getElementById("dressCodePreview").textContent = document.getElementById("dressCodeInput").value;




  }
  inputs.forEach(input => {
    const eventType=input.tagName==="SELECT"?"change":"input";
    input.addEventListener(eventType, updatePreview);
  });

  function updateMapPreview() {
    const address = document.getElementById('mapsLink').value.trim();
    const preview = document.getElementById('previewmapsLink');
  
    if (address) {
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
      preview.innerHTML = `
        <a href="${mapLink}" target="_blank" title="افتح العنوان على الخريطة">
          <i class='bx bx-map'></i> <!-- أو أي أيقونة خريطة تحب تستخدمها -->
        </a>
      `;
    } else {
      preview.innerHTML = "";
    }
  }
 
    function updateWhatsappPreview1() {
      var number = document.getElementById("contactNum1").value.trim();
      var isChecked = document.getElementById("contactWhats1").checked;
      var preview = document.getElementById("previewcontactWhats1");
    
      if (number && isChecked) {
        var whatsappLink = "https://wa.me/" + encodeURIComponent(number);
        
        preview.innerHTML = `
          <a href="${whatsappLink}" target="_blank" title="راسلني على واتساب">
            <i class='bx bxl-whatsapp' style="font-size: 30px; color: #25D366;"></i>
          </a>
        `;
      } else {
        preview.innerHTML = "";
      }
    }
    function updateWhatsappPreview2() {
      var number = document.getElementById("contactNum2").value.trim();
      var isChecked = document.getElementById("contactWhats2").checked;
      var preview = document.getElementById("previewcontactWhats2");
    
      if (number && isChecked) {
        var whatsappLink = "https://wa.me/" + encodeURIComponent(number);
        
        preview.innerHTML = `
          <a href="${whatsappLink}" target="_blank" title="راسلني على واتساب">
            <i class='bx bxl-whatsapp' style="font-size: 30px; color: #25D366;"></i>
          </a>
        `;
      } else {
        preview.innerHTML = ""; 
      }
    }
    function updateCallPreview1() {
  var number = document.getElementById("contactNum1").value.trim();
  var preview = document.getElementById("previewcontactNum1");

  if (number) {
    var callLink = "tel:" + encodeURIComponent(number);

    preview.innerHTML = `
      <a href="${callLink}" title="اتصل بي">
        <i class='bx bx-phone' style="font-size: 30px; color:rgb(7, 151, 43);"></i>
      </a>
    `;
  } else {
    preview.innerHTML = "";
  }
}
 function updateCallPreview2() {
  var number = document.getElementById("contactNum2").value.trim();
  var preview = document.getElementById("previewcontactNum2");

  if (number) {
    var callLink = "tel:" + encodeURIComponent(number);

    preview.innerHTML = `
      <a href="${callLink}" title="اتصل بي">
        <i class='bx bx-phone' style="font-size: 30px; color:rgb(7, 151, 43);"></i>
      </a>
    `;
  } else {
    preview.innerHTML = "";
  }
}

    let player;
    let isPlaying = false;
    document.getElementById('player-container').style.display = 'none';

    function onYouTubeIframeAPIReady() {
        // This function is called automatically by the YouTube IFrame API
    }
    
    function updateMusicPreview() {
        const youtubeLink = document.getElementById('youtubeLink').value.trim();
        const startTimeInput = document.getElementById('startTime').value.trim();
        const autoPlay = document.getElementById('autoPlay').checked;
        const playButton = document.getElementById('playPauseButton');
        
        const videoId = extractVideoId(youtubeLink);
        const startSeconds = parseStartTime(startTimeInput);
    
        if (videoId) {
            if (player) {
                player.destroy();
            }
    
            player = new YT.Player('player', {
                videoId: videoId,
                playerVars: {
                    autoplay: autoPlay ? 1 : 0,
                    start: startSeconds,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0
                },
                events: {
                    onReady: function(event) {
                        if (autoPlay) {
                            event.target.playVideo();
                            isPlaying = true;
                            updatePlayButton();
                        }
                    }
                }
            });
    
            document.getElementById('player-container').style.display = 'block';
            playButton.disabled = false;
        } else {
            document.getElementById('player-container').style.display = 'none';
            playButton.disabled = true;
        }
    }
    
    function togglePlayPause() {
        if (!player) return;
    
        if (isPlaying) {
            player.pauseVideo();
            isPlaying = false;
        } else {
            player.playVideo();
            isPlaying = true;
        }
        updatePlayButton();
    }
    
    function updatePlayButton() {
        const playButton = document.getElementById('playPauseButton');
        if (isPlaying) {
            playButton.innerHTML = `<span>Pause</span> <span><i class='bx bx-pause'></i></span>`;
        } else {
            playButton.innerHTML = `<span>Play</span> <span><i class='bx bx-play'></i></span>`;
        }
    }
    
    function extractVideoId(url) {
        try {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length == 11) ? match[7] : null;
        } catch (e) {
            return null;
        }
    }
    
    function parseStartTime(timeStr) {
        if (!timeStr) return 0;
    
        const parts = timeStr.split(':');
        if (parts.length === 2) {
            const minutes = parseInt(parts[0]);
            const seconds = parseInt(parts[1]);
            return (minutes * 60) + seconds;
        }
        return 0;
    }
    // ——————————————
// 1) دالة تستدعى أوتوماتيكياً عند تحميل YouTube IFrame API
// ——————————————
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: extractVideoId(document.getElementById('youtubeLink').value),
    playerVars: {
      autoplay: 0,
      start: parseStartTime(document.getElementById('startTime').value),
      controls: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

// ——————————————
// 2) تشغيل/إيقاف الصوت عند الضغط على الزر
// ——————————————
function togglePlayPause() {
  if (!player) return;
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
  isPlaying = !isPlaying;
  updatePlayButton();
}

// ——————————————
// 3) الاستماع لتغيّر حالة المشغل وتحديث الحالة
// ——————————————
function onPlayerStateChange(event) {
  isPlaying = (event.data === YT.PlayerState.PLAYING);
  updatePlayButton();
}

// ——————————————
// 4) تغيير أيقونة الزر بين ▶️ و⏸️
// ——————————————
function updatePlayButton() {
  const btn = document.getElementById('playPauseButton');
  btn.innerHTML = isPlaying
    ? "<span>Pause</span> <span><i class='bx bx-pause'></i></span>"
    : "<span>Play</span>  <span><i class='bx bx-play'></i></span>";
}

document.getElementById('playPauseButton')
        .addEventListener('click', togglePlayPause);    

      function updateImage() {
  const design = document.getElementById("design").value;

  const pages = [
    document.querySelector(".page1"),
    document.querySelector(".page2"),
    document.querySelector(".page3"),
    document.querySelector(".page4")
  ];

  pages.forEach((page, index) => {
    const imagePath = `images/${design}_page${index + 1}.webp`; // Example: images/designA_page1.jpg
    page.style.backgroundImage = `url('${imagePath}')`;
    page.style.backgroundSize = "cover";
    page.style.backgroundPosition = "center";
  });
}

// Apply design on page load
window.onload = updateImage;


 function updateColor() {
    const font = document.getElementById("fontSelect").value;
    const color = document.getElementById("colorPicker").value;
    const previewnickName = document.getElementById("previewnickName");

    previewnickName.style.fontFamily = font;
    previewnickName.style.color = color;
  }

  function updateColor2() {
    const font = document.getElementById("fontSelect").value;
    const color = document.getElementById("colorPicker").value;
    const previewnickName = document.getElementById("previeworganizerName1");

    previewnickName.style.fontFamily = font;
    previewnickName.style.color = color;
  }
   function updateColor3() {
    const font = document.getElementById("fontSelect").value;
    const color = document.getElementById("colorPicker").value;
    const previewnickName = document.getElementById("previeworganizerName2");

    previewnickName.style.fontFamily = font;
    previewnickName.style.color = color;
  }
  function handleOrganizerCountChange() {
   const selectedInput = document.querySelector('input[name="organizerCount"]:checked');
  const selected = selectedInput ? selectedInput.value : null;

    const div1 = document.getElementById('colorBorder1');
    const div2 = document.getElementById('colorBorder2');

     if (!selected) {
      div1.style.display = 'block';
      div2.style.display = 'none';
    }else if (selected === 'one') {
      div1.style.display = 'block';
      div2.style.display = 'none';
    } else if (selected === 'two') {
      div1.style.display = 'block';
      div2.style.display = 'block';
    }
    
  }
  let countdownInterval;

function toggleCountdown() {
  const isChecked = document.getElementById('countdownToggle').checked;
  const eventDateInput = document.getElementById('eventDate');
  const countdownPreview = document.getElementById('countdownPreview');

 // clearInterval(countdownInterval); // إلغاء أي مؤقت قديم

  if (isChecked) {
    const targetDate = new Date(eventDateInput.value);

    if (isNaN(targetDate)) {
      countdownPreview.textContent = 'Please select a valid event date.';
      return;
    }

   function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    countdownPreview.innerHTML = "<div class='countdown-box'><div class='value'>0</div><div class='label'>Time's up</div></div>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  countdownPreview.innerHTML = `
    <div class="countdown-box">
      <div class="value">${days}</div>
      <div class="label">Days</div>
    </div>
    <div class="countdown-box">
      <div class="value">${hours}</div>
      <div class="label">Hours</div>
    </div>
    <div class="countdown-box">
      <div class="value">${minutes}</div>
      <div class="label">Minutes</div>
    </div>
  `;
}

    updateCountdown(); // عرض أولي فوري
    countdownInterval = setInterval(updateCountdown, 60 * 1000); // تحديث كل دقيقة
  } else {
    countdownPreview.textContent = '';
  }
}


function toggleSaveDate() {
  const isChecked = document.getElementById('saveDateToggle').checked;
  const container = document.getElementById('saveDateContainer');

  if (isChecked) {
    container.innerHTML = `<button onclick="downloadICS()">Save Date</button>`;
  } else {
    container.innerHTML = '';
  }
}

function downloadICS() {
  const eventDateInput = document.getElementById('eventDate').value;
  if (!eventDateInput) {
    alert('Please select an event date first.');
    return;
  }

  const eventStart = new Date(eventDateInput);
  const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000); // 1 ساعة بعد البداية

  function formatDateToICS(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Event Reminder
DTSTART:${formatDateToICS(eventStart)}
DTEND:${formatDateToICS(eventEnd)}
DESCRIPTION:Don't miss this event!
LOCATION:Your Location
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`.trim();

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'event.ics';
  a.click();
  URL.revokeObjectURL(url);
}
function toggleDressCode() {
  const isChecked = document.getElementById('dressCodeToggle').checked;
  const inputContainer = document.getElementById('dressCodeInputContainer');
  const dressCodePreview = document.getElementById('dressCodePreview');

  if (isChecked) {
    inputContainer.style.display = 'block';
  } else {
    inputContainer.style.display = 'none';
    document.getElementById('dressCodeInput').value = '';
    dressCodePreview.innerHTML = ''; // اخفاء من المعاينة
  }
    updatePreview2();

}
function updatePreview2() {
  const dressCode = document.getElementById('dressCodeInput').value;
  const dressCodePreview = document.getElementById('dressCodePreview');

  if (dressCode.trim() !== '') {
    dressCodePreview.innerHTML = `<strong>Dress Code:</strong> ${dressCode}`;
  } else {
    dressCodePreview.innerHTML = '';
  }
}
function previewImage() {
  const fileInput = document.getElementById('imageUpload');
  const preview = document.getElementById('PreviewImageTag');

  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block'; // تظهر الصورة
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.style.display = 'none'; // تخفي الصورة لو الملف اتشال
  }
}
// function to check if all RSVP inputs are filled
function checkRSVPFields() {
  const deadline = document.getElementById('DeadlineRSVP').value;
  const maxPax = document.getElementById('MaxPax').value;
  const totalGuests = document.getElementById('TotalGuests').value;

  const rsvpIcon = document.getElementById('rsvpPreview');

  if (deadline && maxPax && totalGuests) {
    rsvpIcon.style.display = 'block';
  } else {
    rsvpIcon.style.display = 'none';
  }
}
function showCard(id) {
  const cards = document.querySelectorAll('.info-card');
  cards.forEach(card => {
    if (card.id === id) {
      card.style.display = card.style.display === 'block' ? 'none' : 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
document.addEventListener('click', function(event) {
  const cards = document.querySelectorAll('.info-card');
  const isCard = event.target.closest('.info-card');
  const isFooterIcon = event.target.closest('.footer-icons');

  if (!isCard && !isFooterIcon) {
    cards.forEach(card => card.style.display = 'none');
  }
});

document.getElementById("package").addEventListener("change", function () {
  const selectedPackage = this.value;

  const addPhotoDiv = document.getElementById("addPhoto");
  const countdownDiv = document.getElementById("countdownLabel");
  const wishesDiv = document.getElementById("wishes");

  // نظهر الديفات مبدئياً
  addPhotoDiv.style.display = "block";
  countdownDiv.style.display = "block";

  if (selectedPackage === "silver") {
    addPhotoDiv.style.display = "none";
    wishesDiv.style.display = "none";
  } else if (selectedPackage === "bronze") {
    addPhotoDiv.style.display = "none";
    countdownDiv.style.display = "none";
    wishesDiv.style.display = "none";

  }

  // تحديث الفورمز اللي بيتم تخطيها
  if (selectedPackage === "silver") {
    skippedForms = [6];
  } else if (selectedPackage === "bronze") {
    skippedForms = [6, 8];
  } else {
    skippedForms = [];
  }

  currentForm = 1;
  showForm(currentForm);
});
window.addEventListener("DOMContentLoaded", function () {
  showForm(1);
});







