const fullscreenButton =

            document.getElementById('fullscreenButton');



        fullscreenButton.addEventListener('click', toggleFullscreen);



        function toggleFullscreen() {

            if (!document.fullscreenElement &&

                !document.mozFullScreenElement &&

                !document.webkitFullscreenElement &&

                !document.msFullscreenElement) {

                if (document.documentElement.requestFullscreen) {

                    document.documentElement.requestFullscreen();

                } else if (document.documentElement.mozRequestFullScreen) {

                    document.documentElement.mozRequestFullScreen();

                } else if (document.documentElement.webkitRequestFullscreen) {

                    document.documentElement.webkitRequestFullscreen();

                } else if (document.documentElement.msRequestFullscreen) {

                    document.documentElement.msRequestFullscreen();

                }

                // Change button text to 'Exit Fullscreen'

                

            } else {

                if (document.exitFullscreen) {

                    document.exitFullscreen();

                } else if (document.mozCancelFullScreen) {

                    document.mozCancelFullScreen();

                } else if (document.webkitExitFullscreen) {

                    document.webkitExitFullscreen();

                } else if (document.msExitFullscreen) {

                    document.msExitFullscreen();

                }

                // Change button text to 'Enter Fullscreen'

                

            }

        }
 
            

        // Biến để theo dõi trạng thái âm thanh
        let isAudio = false;
  const audio = document.getElementById('background-audio');
   // Wait for DOM content to be loaded
  document.addEventListener("DOMContentLoaded", function() {
    // Get the audio element by its ID
  
       
   
let  playingOnHide =false;

  
    // Event listener for visibility change
    document.addEventListener("visibilitychange", () => {
      // Check if document is hidden
      if (document.hidden) {
        // Pause audio when document is hidden
        playingOnHide = !audio.paused; // Check if audio was playing before hiding
        audio.pause(); // Pause audio playback
      } else {
        // Resume audio playback when document becomes visible
        if (playingOnHide) {
          audio.play(); // Resume playback if audio was playing before hiding
        }
      }
    });
  });


        // Đảm bảo phát nhạc khi người dùng tương tác (do hạn chế của trình duyệt)
        document.addEventListener('click', function() {
            if (isAudio) {
                audio.pause();
              
            } else {
                audio.play();
              
            }
            isAudio = !isAudio; // Đổi trạng thái
            });   
            
MathJax = {
            tex: {
                displayMath: [['$$', '$$']],
                inlineMath: [['$', '$']],
                processEscapes: true,
                processEnvironments: true
            }
        };

      
        const md = window.markdownit({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true,
        });

        md.use(window.markdownitMultimdTable);
        md.use(window.markdownitDiv);
        md.use(window.markdownitSup);
        md.use(window.markdownitSub);
        md.use(window.markdownitIns);
        md.use(window.markdownitMark);
        md.use(window.markdownitDeflist);
        md.use(bracketed_spans_plugin);
md.use(window.markdownItAttrs);
function preserveLeadingSpaces(content) {
    return content.replace(/^\s+/gm, spaces => spaces.replace(/ /g, '&nbsp;'));
}

function renderText(content) {
    const div = document.getElementById('contain');
    let finalContent = md.render(preserveLeadingSpaces(content).replace(/<\d+>/g, ''));
    div.innerHTML = finalContent;

 

      MathJax.typesetPromise()
        .then(() => {
            console.log("MathJax rendering completed.");
        })
        .catch((err) => {
            console.error("Error in MathJax rendering:", err);
        });
}

let typing = false;
let isPaused = true;
let letterIndex = 0;
let currentTimeout;
let currentLine = 0;
let audioContext; // Khai báo audioContext để có thể truy cập toàn cục


function playTypingSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Tạo âm thanh chính
    const mainOscillator = audioContext.createOscillator();
    const mainGain = audioContext.createGain();

    mainOscillator.type = 'square'; // Sóng vuông
    mainOscillator.frequency.value = 400; // Tần số chính, điều chỉnh để phù hợp
    mainGain.gain.value = 0.01; // Âm lượng vừa phải

    mainOscillator.connect(mainGain);
    mainGain.connect(audioContext.destination);

    // Tạo tạp âm (white noise)
    const bufferSize = audioContext.sampleRate * 0.1; // Độ dài 0.1 giây
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Tạo tạp âm ngẫu nhiên
    }

    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.005; // Âm lượng thấp hơn cho tạp âm

    whiteNoise.connect(noiseGain);
    noiseGain.connect(audioContext.destination);

    // Bắt đầu phát âm thanh
    mainOscillator.start(audioContext.currentTime);
    mainOscillator.stop(audioContext.currentTime + 0.05); // Dừng sau 50ms

    whiteNoise.start(audioContext.currentTime);
    whiteNoise.stop(audioContext.currentTime + 0.03); // Dừng tạp âm sau 30ms
}

function typeLetterByLetter(content, onComplete) {
    typing = true;

    function typeNext() {
        if (isPaused) return;

        // Kiểm tra delay
        const delayMatch = content.substring(letterIndex).match(/^<(\d+)>/);
        if (delayMatch) {
            const delayTime = parseInt(delayMatch[1]) * 1000;
            letterIndex += delayMatch[0].length;
            currentTimeout = setTimeout(typeNext, delayTime);
            return;
        }

        // Kiểm tra thẻ <d>...</d> và hiển thị toàn bộ nội dung bên trong
        const sTagMatch = content.substring(letterIndex).match(/^<d>(.*?)<\/d>/);
        if (sTagMatch) {
            const sTagContent = sTagMatch[1];
            letterIndex += sTagMatch[0].length;
            renderText(content.substring(0, letterIndex) + '<span class="cursor"></span>');
            currentTimeout = setTimeout(typeNext, 50);
            return;
        }

        // Kiểm tra thẻ <d10>...</d> và xử lý độc lập
       const d10TagMatch = content.substring(letterIndex).match(/^<d10>(.*?)<\/d>/);
if (d10TagMatch) {
    const d10Content = d10TagMatch[1];
    const preTagContent = content.substring(0, letterIndex);
    letterIndex += d10TagMatch[0].length;

    // Hiển thị nội dung ngay lập tức
    renderText(preTagContent + d10Content + '<span class="cursor"></span>');

    // Xóa nội dung trong thẻ <d10> sau 10 giây
    setTimeout(() => {
        const currentContent = content.substring(0, letterIndex).replace(d10TagMatch[0], ''); // Loại bỏ toàn bộ thẻ <d10> cùng nội dung
        renderText(currentContent + '<span class="cursor"></span>');
        content = content.replace(d10TagMatch[0], ''); // Cập nhật biến content để thẻ không xuất hiện lại
    }, 10000);

    // Tiếp tục gõ phần nội dung sau thẻ <d10> ngay lập tức
    currentTimeout = setTimeout(typeNext, 50);
    return;
}

        // Hiển thị từng ký tự nếu không gặp thẻ đặc biệt
        if (letterIndex < content.length) {
            renderText(content.substring(0, letterIndex + 1) + '<span class="cursor"></span>');
            letterIndex++;
            if (letterIndex % 5 === 0 && typing && !document.hidden) {
                playTypingSound();
            }
            currentTimeout = setTimeout(typeNext, 100);
        } else {
            typing = false;
            renderText(content); // Hiển thị toàn bộ nội dung khi hoàn tất
            if (!speaking) {
                audio.pause();
                document.getElementById("circleBtnsContainer").style.backgroundColor = "#fffee9"; // Xám nhẹ
            }
            onComplete();
        }
    }

    typeNext();
}



function togglePlayPauseL() {
    isPaused = !isPaused;
    if (!isPaused) {
        const content = markdownContent[currentLine];
        typeLetterByLetter(content, () => {
            // Nội dung thực hiện khi hoàn tất gõ chữ
        });
    } else {
        clearTimeout(currentTimeout);
    }
}

        function nextContent() {if (speaking||typing) return;
            if (currentLine < markdownContent.length - 1) {
                currentLine++;
                letterIndex = 0;
                isPaused = true; // Pause after navigating
                clearDiv(); // Clear display until Play is pressed
                
            }
        }

        function previousContent() {if (speaking||typing) return;
            if (currentLine > 0) {
                currentLine--;
                letterIndex = 0;
                isPaused = true; // Pause after navigating
                clearDiv(); // Clear display until Play is pressed
                
            }
        }

     
        function displayContent() {
            clearDiv();
            if (!isPaused) {
                togglePlayPause();
            }
        }

        function clearDiv() {
            document.getElementById('contain').innerHTML = '';
        }

      

        window.onload = clearDiv;
   
      let isPlay = false;
let currentIndex = 0;
let currentPart = 0;
let charIndex = 0;
let utterance;
let voices = [];
let speaking = false;
let delayTimeoutId = null;
let wasPlaying = false;

function getVoices() {
    voices = window.speechSynthesis.getVoices();
    return voices.filter(voice => voice.lang === 'vi-VN');
}

function processText(text) {
    const regex = /<(.*?)>/g;
    let result;
    let lastIndex = 0;
    let segments = [];
    let currentRate = 1;
    let currentPitch = 1;
    let currentVolume = 1;

    while ((result = regex.exec(text)) !== null) {
        const partText = text.substring(lastIndex, result.index);
        segments.push({
            text: partText,
            rate: currentRate,
            pitch: currentPitch,
            volume: currentVolume,
            delay: 0
        });

        const tag = result[1];
        if (tag.includes('R')) {
            const rateValue = parseFloat(tag.replace('R', ''));
            currentRate = rateValue;
        } else if (tag.includes('D')) {
            const seconds = parseInt(tag.replace('D', ''));
            segments.push({
                text: '',
                rate: currentRate,
                pitch: currentPitch,
                volume: currentVolume,
                delay: seconds * 1000
            });
        } else if (tag.includes('P')) {
            const pitchValue = parseFloat(tag.replace('P', ''));
            currentPitch = pitchValue;
        } else if (tag.includes('V')) {
            const volumeValue = parseFloat(tag.replace('V', ''));
            currentVolume = volumeValue;
        }

        lastIndex = regex.lastIndex;
    }

    segments.push({
        text: text.substring(lastIndex),
        rate: currentRate,
        pitch: currentPitch,
        volume: currentVolume,
        delay: 0
    });

    return segments;
}

function speakPart() {
    const parts = processText(texttts[currentIndex]);
    speaking = true;

    function speak() {
        if (currentPart >= parts.length) {
            isPlay = false;
            speaking = false;
            if (!typing) {audio.pause();
                document.getElementById("circleBtnsContainer").style.backgroundColor = "#fffee9"; // Xám nhẹ
            }
            return;
        }

        const part = parts[currentPart];
        
        if (part.delay > 0) {
            delayTimeoutId = setTimeout(() => {
                currentPart++;
                charIndex = 0;
                speak();
            }, part.delay);
        } else if (part.text.trim()) {
            const textToSpeak = part.text.substring(charIndex);
            utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.voice = getVoices()[0];
            utterance.rate = part.rate;
            utterance.pitch = part.pitch;
            utterance.volume = part.volume;

            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    charIndex = event.charIndex;
                }
            };
            
            utterance.onend = () => {
                charIndex = 0;
                currentPart++;
                speak();
            };

            window.speechSynthesis.speak(utterance);
        } else {
            currentPart++;
            charIndex = 0;
            speak();
        }
    }

    speak();
}

function togglePlayPauseT() {
    if (isPlay) {
        window.speechSynthesis.cancel();
        clearTimeout(delayTimeoutId);
        delayTimeoutId = null;
        isPlay = false;
    } else {
        speakPart();
        isPlay = true;
    }
}

// Dừng phát tiếng khi chuyển tab và tự động phát lại khi quay lại
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        if (isPlay || delayTimeoutId) {
            togglePlayPauseT(); // Dừng phát tiếng và hủy delay nếu cần
            wasPlaying = true;

        }
    } else {
        if (wasPlaying) {
            togglePlayPauseT(); // Bật lại phát tiếng hoặc delay nếu cần
            wasPlaying = false;

        }
    }
});
        function previousText() { if (speaking||typing) return;
            if (currentIndex > 0) {
                currentIndex--;
                charIndex = 0;
                currentPart = 0;
                window.speechSynthesis.cancel();
                if (isPlay) {
                    speakPart();
                }
            }
        }

        function nextText() {if (speaking||typing) return;
            if (currentIndex < texttts.length - 1) {
                currentIndex++;
                charIndex = 0;
                currentPart = 0;
                window.speechSynthesis.cancel();
                if (isPlay) {
                    speakPart();
                }
            }
        }



        window.speechSynthesis.onvoiceschanged = getVoices;
 // Create circle buttons dynamically
        function createCircleButtons() {
            const container = document.getElementById('circleBtnsContainer');
            container.innerHTML = ''; // Clear existing buttons

            for (let i = 0; i < texttts.length; i++) {
                const btn = document.createElement('div');
                btn.classList.add('circle-btn');
                btn.setAttribute('data-index', i);
                btn.onclick = function() { jumpToContent(i); };
                container.appendChild(btn);
            }
            updateCircleButtons(); // Set initial active button
        }

        // Update circle button styles
        function updateCircleButtons() {
            const buttons = document.querySelectorAll('.circle-btn');
            buttons.forEach(btn => {
                const index = btn.getAttribute('data-index');

                if (index == currentIndex) {
               btn.classList.add('active');
                } else {
              btn.classList.remove('active');
                }
            });
        }

        // Jump to a specific content index
        function jumpToContent(index) {if (speaking||typing) return;
           
                currentLine = index;
                clearDiv();
                isPaused=true;
           currentIndex = index;
                 letterIndex=0; 
                charIndex = 0;
                currentPart = 0;
                window.speechSynthesis.cancel();
                isPlay = false;
            updateCircleButtons();
        }
 window.addEventListener('touchstart', (event) => {
            startY = event.touches[0].clientY;
            startX = event.touches[0].clientX;
        });

        window.addEventListener('touchend', (event) => {
            const endY = event.changedTouches[0].clientY;
            const endX = event.changedTouches[0].clientX;

            if (endY - startY > 30 || endX - startX > 30) {
                previousText();previousContent();
            } else if (startY - endY > 30 || startX - endX > 30) {
           nextText();nextContent();
            } updateCircleButtons(); 
          
        });
 // JavaScript xử lý sự kiện
    document.addEventListener('keydown', function(event) {
      // Kiểm tra phím Space (mã key: 32)
      if (event.shiftKey && event.code === 'Space') {
        event.preventDefault(); // Ngăn cuộn trang mặc định
        document.getElementById('myButton').click();
      }
    });

    // Hàm xử lý khi nhấn nút
    document.getElementById('myButton').addEventListener('click', function() {
      togglePlayPauseT();
      togglePlayPauseL();
    });
document.addEventListener('keydown', function(event) {
  if (event.shiftKey && event.code === 'PageDown') {
    // Tìm nút có ID là "myButton" và kích hoạt nó
          previousText();previousContent();
  }
if (event.shiftKey && event.code === 'PageUp') {
    // Tìm nút có ID là "myButton" và kích hoạt nó
                  nextText();nextContent();} updateCircleButtons(); 
  }

});			


      
   // Initialize circle buttons on page load
        window.onload = createCircleButtons;
document.getElementById('contain').addEventListener('click', () => {
    document.getElementById('circleBtnsContainer').style.backgroundColor = "white";
});