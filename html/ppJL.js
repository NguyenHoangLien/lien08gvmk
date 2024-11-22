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
        
function preserveLeadingSpaces(content) {
    return content.replace(/^\s+/gm, spaces => spaces.replace(/ /g, '&nbsp;'));
}

function renderText(content) {
    const div = document.getElementById('contain');
    let finalContent = md.render(preserveLeadingSpaces(content).replace(/<\d+>/g, ''));
    div.innerHTML = finalContent;

    // Gọi MathJax để render LaTeX
       setTimeout(() => MathJax.typeset(), 0);
}

let typing = false;
let isPaused = true;
let letterIndex = 0;
let currentTimeout;
let currentLine = 0;
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
            const visibleContent = content.substring(0, letterIndex);
            renderText(visibleContent + '<span class="cursor"></span>');
            currentTimeout = setTimeout(typeNext, 50);
            return;
        }

        // Hiển thị từng ký tự nếu không gặp delay hoặc <d>...</d>
        if (letterIndex < content.length) {
            const visibleContent = content.substring(0, letterIndex + 1);
            renderText(visibleContent + '<span class="cursor"></span>');
            letterIndex++;
            currentTimeout = setTimeout(typeNext, 50);
        } else {
            typing = false;
            renderText(content); // Hiển thị toàn bộ nội dung khi hoàn tất
            if (!speaking) {
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
            if (!typing) {
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

        window.addEventListener('keydown', (event) => {
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          previousText();previousContent();
            } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  nextText();nextContent();} updateCircleButtons(); 
        });
   // Initialize circle buttons on page load
        window.onload = createCircleButtons;
document.getElementById('contain').addEventListener('click', () => {
    document.getElementById('circleBtnsContainer').style.backgroundColor = "white";
});