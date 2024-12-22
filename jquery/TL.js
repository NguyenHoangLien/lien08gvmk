   let isFourQuestionSelected = false;
let fourQuestionIndex =10; // Index câu hỏi đã chọn của phần four
let score = 0; // Điểm của người dùng, giả định được tính từ các phần khác
 
const form = document.forms["BT"];
    const fileInput = document.getElementById("media");
    const submitButton = document.getElementById("submit-button");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      // Handle the file upload
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        // Chỉ cho phép các file có định dạng jpg hoặc pdf
        if (!["jpg", "pdf"].includes(fileExtension)) {
          alert("Only JPG and PDF files are allowed.");
          return;
        }

        // Size validation, chỉ cho phép dưới 16MB
        if (file.size > 1024 * 1024 * 16) {
          alert("File size should be less than 16MB.");
          return;
        }

        const reader = new FileReader();
        
        reader.onload = async function () {
          formData.append("media", reader.result.split(",")[1]); // Append base64 data
          formData.append("fileExtension", fileExtension); // Append file extension
          await submitForm(formData);
        };

        reader.readAsDataURL(file);
      } else {
        // Nếu không có file upload
        await submitForm(formData);
      }
    });

    async function submitForm(formData) {
      submitButton.disabled = true;
      submitButton.innerText = "Loading...";

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
          // Đổi nội dung nút thành "Thanks" khi nộp thành công
          submitButton.innerText = "Thanks";
          submitButton.classList.remove("btn-primary");
          submitButton.classList.add("btn-success");
        })
        .catch((error) => {
          alert("Something went wrong. Please try again!");
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    }

    
       

 

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
                processEnvironments: true,
                tagSide: "right",
                tagIndent: "0.8em",
                multlineWidth: "85%",
                linebreaks: { automatic: false }
            }
        };

        const md = window.markdownit({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true,
        });

        md.use(window.markdownitMultimdTable, {
            multiline: true,
            rowspan: true,
            columnspan: true,
            headerless: true,
            allowCellNoPadding: true
        });

        md.use(window.markdownitDiv);
        md.use(window.markdownitSup);
        md.use(window.markdownitSub);
        md.use(window.markdownitIns);
        md.use(window.markdownitMark);
        md.use(window.markdownitDeflist);

          md.use(window.markdownItAttrs);
         md.use(bracketed_spans_plugin);



function preserveLeadingSpaces(content) {
            return content.replace(/^\s+/gm, (spaces) => {
                return spaces.replace(/ /g, '&nbsp;');
            });
        }

        

        // Hàm kiểm tra thời gian hiện tại và cập nhật tiêu đề + hiển thị div
        function checkDisplayDate() {
            const today = new Date(); // Ngày hiện tại

            // Cập nhật tiêu đề với khoảng thời gian
          
            // Hiển thị hoặc ẩn div dựa trên ngày hiện tại
            if (today >= startDate && today <= endDate) {
                document.getElementById('startQuizButton').style.display = 'block';
            } else {
                document.getElementById('startQuizButton').style.display = 'none';
  document.getElementById('dateDisplay').textContent =
                `Từ ${startDate.getDate().toString().padStart(2, '0')}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getFullYear()} đến ${endDate.getDate().toString().padStart(2, '0')}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getFullYear()}`;

            }
        }

        // Gọi hàm kiểm tra khi trang được tải
        window.onload = checkDisplayDate;  
let currentQuestion = 0;
let currentSection = 'one';
let quizTimer;

const selectedArray = { one: [], two: [], three: [] };
const savedStatus = { one: [], two: [], three: [] };

function switchSection(section) {
    currentSection = section;

    if (section === 'four') {
        if (!isFourQuestionSelected) {
            // Chọn ngẫu nhiên một câu hỏi từ phần four nếu chưa chọn
            fourQuestionIndex = Math.floor(Math.random() * questions.four.length);
            isFourQuestionSelected = true; // Đánh dấu đã chọn câu hỏi
        }

        // Hiển thị câu hỏi của phần four và phần tải lên file
 const questionText = questions.four[fourQuestionIndex].Q;
 document.getElementById('questionText').innerHTML = md.render(preserveLeadingSpaces(questionText));


    

      MathJax.typesetPromise()
        .then(() => {
            console.log("MathJax rendering completed.");
        })
        .catch((err) => {
            console.error("Error in MathJax rendering:", err);
        });
       
        document.getElementById('custom').style.display = 'block'; // Hiển thị phần tải lên file
document.getElementById('questionForm').style.display = 'none';
document.getElementById('quickNavButtons').style.display = 'none';
    } else {document.getElementById('questionForm').style.display = 'flex';
document.getElementById('quickNavButtons').style.display = 'flex';
        // Ẩn phần tải lên file ở các phần khác
        document.getElementById('custom').style.display = 'none';
        currentQuestion = 0;
        showQuestion();  // Hiển thị câu hỏi của phần khác ngoài phần four
    }
}

        function startTimer() { setTimeout(() => {
  document.getElementById("submit-button").click(); // Kích hoạt sự kiện click tự động
},  timeLeft*1000); // Thời gian chờ: 5 phút
            quizTimer = setInterval(() => {
                if (timeLeft <= 0) { document.getElementById('quizContainer').style.display = 'none';
                    clearInterval(quizTimer);
 
                           
      
                    
                   
                    
                    

                } else {
                    timeLeft--;
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    document.getElementById('timer').textContent =
                        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }, 1000);
        }

        function initializeQuiz() {
            shuffle(questions.one);
            shuffle(questions.two);
            shuffle(questions.three);
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
function showQuestion() {
 const questionText = questions[currentSection][currentQuestion]?.Q || "HẾT";
    document.getElementById('questionText').innerHTML =         md.render(preserveLeadingSpaces(questionText));


   

      MathJax.typesetPromise()
        .then(() => {
            console.log("MathJax rendering completed.");
        })
        .catch((err) => {
            console.error("Error in MathJax rendering:", err);
        });
    setTimeout(adjustLayoutByFontAndScreenSize, 100); // Điều chỉnh giao diện

    let formContent = '';

    if (currentSection === 'one') {
        formContent += `
            <div class="radio-group">
               
                <label><input type="radio" name="option" value="A" onchange="toggleCheckboxes(false)"> A</label>
                <label><input type="radio" name="option" value="B" onchange="toggleCheckboxes(false)"> B</label>
                <label><input type="radio" name="option" value="C" onchange="toggleCheckboxes(false)"> C</label>
                <label><input type="radio" name="option" value="D" onchange="toggleCheckboxes(false)"> D</label>
            </div>
            <span class="error" id="answerError" style="display: none;">Vui lòng chọn đáp án.</span>`;
    } else if (currentSection === 'two') {
        formContent += `
            <div class="checkbox-group">
               
                <label><input type="checkbox" name="option" value="a" onchange="uncheckRadio()"> a</label>
                <label><input type="checkbox" name="option" value="b" onchange="uncheckRadio()"> b</label>
                <label><input type="checkbox" name="option" value="c" onchange="uncheckRadio()"> c</label>
                <label><input type="checkbox" name="option" value="d" onchange="uncheckRadio()"> d</label>
                <br>
                <label><input type="radio" name="toggle" value="none" onchange="clearCheckboxes()"> &nbsp;</label>
            </div>
            <span class="error" id="answerError" style="display: none;">Vui lòng chọn ít nhất một đáp án.</span>`;
    } else {
        formContent = `
            <div>
                <input type="text" id="answerInput" size="4" placeholder=".số.">
            </div>
            <span class="error" id="answerError" style="display: none;">Nhập đáp án phù hợp</span>`;
    }

    document.getElementById('questionForm').innerHTML = formContent;
  showQuickNavButtons()
}

function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="option"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

function uncheckRadio() {
    const radio = document.querySelector('input[type="radio"][value="none"]');
    if (radio) radio.checked = false;
}

function saveSelection() {
    let isSaved = false;
    const message = document.getElementById('answerError');

    if (currentSection === 'one') {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            selectedArray['one'][currentQuestion] = selectedOption.value;
            savedStatus['one'][currentQuestion] = true;
            isSaved = true;
        } 
    } else if (currentSection === 'two') {
       const selectedOptions = [...document.querySelectorAll('input[name="option"]:checked')];
    const radioSelected = document.querySelector('input[type="radio"][value="none"]:checked');

    // Kiểm tra nếu có chọn Radio hoặc Checkbox
    if (selectedOptions.length > 0 || radioSelected) {
        const values = radioSelected ? ['none'] : selectedOptions.map(input => input.value);
        selectedArray['two'][currentQuestion] = values;  // Lưu đáp án vào mảng
        savedStatus['two'][currentQuestion] = true;      // Đánh dấu đã lưu
        isSaved = true;
    }
    } else if (currentSection === 'three') {
        const answerInput = document.getElementById('answerInput');
        const answerValue = answerInput.value.trim();

        if (/^[-]?\d{1,4}(\.\d{1,2})?$/.test(answerValue)) {
            selectedArray['three'][currentQuestion] = answerValue;
            savedStatus['three'][currentQuestion] = true;
            isSaved = true;
        }
    }

    if (isSaved) {
        message.style.display = 'none'; // Ẩn thông báo nếu lưu thành công
      
        showQuickNavButtons(); // Cập nhật nút điều hướng nhanh
    } else {
        message.style.display = 'block'; // Hiển thị thông báo lỗi nếu không hợp lệ
    }
}

       function showQuickNavButtons(isVertical = true) {
    const quickNavButtonsDiv = document.getElementById('quickNavButtons');
    quickNavButtonsDiv.innerHTML = '';  // Clear existing buttons

    // Xóa các class điều chỉnh trước
    quickNavButtonsDiv.classList.remove('vertical', 'horizontal');

    // Thêm class dựa trên kiểu hiển thị (dọc hay ngang)
    if (isVertical) {
        quickNavButtonsDiv.classList.add('vertical');  // Thêm class cho hiển thị dọc
    } else {
        quickNavButtonsDiv.classList.add('horizontal');  // Thêm class cho hiển thị ngang
    }

    for (let i = 0; i < questions[currentSection].length; i++) {
        const button = document.createElement('button');
        button.innerText = `${(i + 1).toString().padStart(2, '0')}`;

        if (savedStatus[currentSection][i]) {
            button.classList.add('saved');  // Apply the 'saved' class
        }

        if (i === currentQuestion) {
            button.disabled = true;
            button.style.opacity = 0.9;
        }

        button.addEventListener('click', () => {
            currentQuestion = i;
            showQuestion();  // Show the selected question
        });

        quickNavButtonsDiv.appendChild(button);
    }
}


     



    function calculatePartOneScore(userAnswers) {
    let score = 0;
    questions.one.forEach((q, index) => {
        const correctAnswer = q.A;  // Correct answer
        if (userAnswers[index] !== undefined && userAnswers[index] === correctAnswer) {
            score += 0.5;
        }
    });
    return score;
}

function calculatePartTwoScore(userAnswers = []) {
    let totalScore = 0;

    questions.two.forEach((q, index) => {
        const correctAnswer = q.A || [];  // Correct answer
        const userAnswer = userAnswers[index] || [];  // User's answer
        let point = 0;  // Initialize points

        // Check if 'none' (radio button) is selected
        const isRadioSelected = userAnswer.includes('none');
        const hasCheckboxSelection = userAnswer.length > 0 && !isRadioSelected;

        // Skip if neither radio nor checkbox options are selected
        if (!isRadioSelected && !hasCheckboxSelection) {
            console.log(`Câu ${index + 1}: Không có lựa chọn nào -> Bỏ qua câu hỏi.`);
            return;
        }

        if (isRadioSelected) {
            console.log(`Câu ${index + 1}: Chọn 'none' -> Tính điểm với checkbox trống.`);
            const totalCorrect = correctAnswer.length;
            const totalSelected = 0; // No checkbox selected
            point = 2 * 0 + 4 - (totalCorrect + totalSelected); // Apply formula
        } else {
            // Calculate points based on selected checkboxes
            const matchingAnswers = userAnswer.filter(option => correctAnswer.includes(option)).length;
            const totalCorrect = correctAnswer.length;
            const totalSelected = userAnswer.length;

            // Scoring formula
            point = 2 * matchingAnswers + 4 - (totalCorrect + totalSelected);

            console.log(`Câu ${index + 1}: Matching = ${matchingAnswers}, Điểm = ${point}`);
        }


        // Convert points to {0.25, 0.5, 1, 2}
        let questionScore;
        if (point === 1) questionScore = 0.25;
        else if (point === 2) questionScore = 0.5;
        else if (point === 3) questionScore = 1;
        else if (point === 4) questionScore = 2;
        else questionScore = 0;  // Default to 0

        console.log(`Câu ${index + 1}: Điểm cuối cùng = ${questionScore}`);

        // Add to total score
        totalScore += questionScore;
    });

    return totalScore;
}



 


// Function to calculate Part Three score
function calculatePartThreeScore(userAnswers) {
    let score = 0;
    questions.three.forEach((q, index) => {
        const correctAnswer = q.A;  // Correct answer
        if (userAnswers[index] !== undefined && userAnswers[index] === correctAnswer) {
            score += 1;
        }
    });
    return score;
}


// Function to calculate total score
function calculateScore() {
    const partOneScore = calculatePartOneScore(selectedArray.one);
    const partTwoScore = calculatePartTwoScore(selectedArray.two);
    const partThreeScore = calculatePartThreeScore(selectedArray.three);

    const totalScore = partOneScore + partTwoScore + partThreeScore;
   
            return totalScore;
}

        document.getElementById('startQuizButton').addEventListener('click', () => {
            document.getElementById('startContainer').classList.add('hidden');
            document.getElementById('quizContainer').classList.remove('hidden');
            startTimer();
            initializeQuiz();
            showQuestion();
        });
let startY, startX;

// Xử lý vuốt (mobile)
window.addEventListener('touchstart', (event) => {
    if (event.target.tagName === 'INPUT') return; // Bỏ qua nếu đang tương tác với input
    startY = event.touches[0].clientY;
    startX = event.touches[0].clientX;
});

window.addEventListener('touchend', (event) => {
    if (event.target.tagName === 'INPUT') return; // Bỏ qua nếu đang tương tác với input
    const endY = event.changedTouches[0].clientY;
    const endX = event.changedTouches[0].clientX;

    // Nếu câu hỏi hiện tại chưa được trả lời
    if (!savedStatus[currentSection][currentQuestion]) {
        // Thực hiện hiệu ứng nội bộ (phóng to/thu nhỏ/dịch chuyển)
        const questionDiv = document.getElementById('questionContainer'); // ID của container câu hỏi

        // Xử lý phóng to hoặc dịch chuyển theo hướng vuốt
        if (startY - endY > 30) {
            questionDiv.style.transform = 'scale(1.1)'; // Phóng to
        } else if (endY - startY > 30) {
            questionDiv.style.transform = 'scale(0.9)'; // Thu nhỏ
        } else if (startX - endX > 30) {
            questionDiv.style.transform = 'translateX(-10px)'; // Dịch trái
        } else if (endX - startX > 30) {
            questionDiv.style.transform = 'translateX(10px)'; // Dịch phải
        }

        // Reset lại hiệu ứng sau 300ms
        setTimeout(() => {
            questionDiv.style.transform = 'none';
        }, 300);
        return; // Không chuyển câu hỏi
    }

    // Logic chuyển câu hỏi khi đã trả lời
    if (startY - endY > 30 || endX - startX > 30) {
        if (currentQuestion < questions[currentSection].length - 1) {
            currentQuestion++;
        }
    } else if (endY - startY > 30 || startX - endX > 30) {
        if (currentQuestion > 0) {
            currentQuestion--;
        }
    }
    showQuestion();
});

window.addEventListener('keydown', (event) => {
    // Ngăn không cho hành động mặc định của phím mũi tên tác động vào các input
    if (
        event.key === "ArrowUp" || 
        event.key === "ArrowDown" || 
        event.key === "ArrowLeft" || 
        event.key === "ArrowRight"
    ) {
        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt (di chuyển focus)

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            if (currentQuestion < questions[currentSection].length - 1) {
                currentQuestion++;
                showQuestion();
            }
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion();
            }
        }
    }
});

        document.getElementById('questionForm').addEventListener('click', saveSelection);
        
window.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;

    // Ngăn không cho hành động mặc định của phím mũi tên tác động vào các input hoặc textarea
    if (
        event.key === "ArrowUp" || 
        event.key === "ArrowDown" || 
        event.key === "ArrowLeft" || 
        event.key === "ArrowRight"
    ) {
        // Bỏ qua nếu phần tử đang nhận focus là input, textarea, hoặc một phần tử có khả năng nhận đầu vào
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            return;
        }

        event.preventDefault(); // Ngăn hành vi mặc định của trình duyệt (di chuyển focus)

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            if (currentQuestion < questions[currentSection].length - 1) {
                currentQuestion++;
                showQuestion();
            }
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion();
            }
        }
    }
})   
   
document.getElementById('submit-button').addEventListener('click', function () {
            // Tính toán tổng điểm

document.getElementById('quizContainer').style.display = 'none';
document.getElementById('BT').submit;
            const totalScore = calculateScore();

            // Ghi tổng điểm vào input
            const scoreInput = document.getElementById('score');
            scoreInput.value = 100*(fourQuestionIndex+1)+totalScore;

            // Tùy chọn: thông báo tổng điểm
            alert(`Bạn đạt: ${totalScore}`);

        });


document.getElementById("username").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submit-button").click();

  }
});
  
  
function adjustLayoutByFontAndScreenSize() {
    const container = document.querySelector('#questionText .M, #questionText .S');
    const items = container.querySelectorAll('li');
    const containerWidth = container.clientWidth;
    const fontSize = parseFloat(window.getComputedStyle(items[0]).fontSize);

    let maxLength = 0;

    items.forEach(item => {
        const contentLength = item.textContent.length;
        const itemLengthInPixels = contentLength * (fontSize * 0.6);

        if (itemLengthInPixels > maxLength) {
            maxLength = itemLengthInPixels;
        }
    });

    items.forEach((item, index) => {  item.innerHTML = item.textContent + '  ';
        if (maxLength > containerWidth * 0.5) {
            item.style.left = '0';
            item.style.top = `${index * 60}px`;
        } else if (maxLength < containerWidth * 0.25) {
            item.style.left = `${(index % 4) * 25}%`;
            item.style.top = `${Math.floor(index / 4) * 60}px`;
        } else {
            item.style.left = (index % 2 === 0) ? '0' : '50%';
            item.style.top = `${Math.floor(index / 2) * 60}px`;
        }
    });
}

window.addEventListener('resize', adjustLayoutByFontAndScreenSize);