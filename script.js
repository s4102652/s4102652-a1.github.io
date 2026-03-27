// --- 1. XỬ LÝ LOADING SCREEN ---


window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loadBar = document.getElementById('load-bar');
    if (loadBar) loadBar.style.width = '100%';
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 1000);
        }
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    // --- 2. KHAI BÁO BIẾN TỔNG LỰC ---
    const section2 = document.querySelector('.section2');
    const introScreen = document.getElementById('intro-screen');
    const playBtn = document.getElementById('play-btn');
    const roomOn = document.getElementById('room-on-layer');
    const roomOff = document.getElementById('room-off-layer');
    const flash = document.getElementById('light-flash');
    
    // Section 1: Đèn, Cửa, Logo, Tủ, Câu thơ
    const fanOn = document.querySelector('.ceiling-fan');
    const fanOff = document.querySelector('.ceiling-fan-off');
    const door = document.querySelector('.door');
    const logo = document.querySelector('.logo');
    const wardrobe = document.querySelector('.wardrobe-off');
    const eyesImage = document.querySelector('.eyes');
    const pouncedTrigger = document.getElementById('pounced-trigger');
    
    const câu1 = document.getElementById('câu1');
    const câu1b = document.getElementById('câu1b');
    const câu2 = document.getElementById('câu2');
    const câu2b = document.getElementById('câu2b');
    const câu3 = document.getElementById('câu3');

    // Section 2: Girl, Mini-game
    const girl = document.querySelector('.girl');
    const bubble = document.getElementById('girl-bubble');
    const paper = document.getElementById('crumble-paper'); 
    const drawingView = document.getElementById('drawing-view');
    const mainDrawing = document.getElementById('current-drawing');
    const wordPurple = document.getElementById('trigger-purple');
    const wordEyes = document.getElementById('trigger-eyes');

    let hasClickedPurple = false;
    let hasClickedEyes = false;
    let s4StoryStep = 0;
    // --- 3. LOGIC SECTION 1 (Phòng 1) ---

    // Nút Start
if (playBtn && introScreen) {
        playBtn.addEventListener('click', () => {
            // 1. Kéo màn hình intro lên và phát âm thanh nút bấm
            introScreen.classList.add('slide-up');
            const startSnd = document.getElementById('start-snd');
            if (startSnd) { startSnd.currentTime = 0; startSnd.play(); }

            // 2. PHÁT NHẠC NỀN (BGM) KÈM HIỆU ỨNG TO DẦN (FADE-IN)
            const bgm = document.getElementById('bgm');
            if (bgm) {
                bgm.volume = 0; // Bắt đầu âm lượng ở mức 0
                bgm.play().catch(error => console.log("Lỗi phát nhạc nền:", error));

                // Từ từ tăng âm lượng lên mức 0.4 (40%) để không lấn át tiếng hiệu ứng
                let fadeAudio = setInterval(() => {
                    if (bgm.volume < 0.4) {
                        bgm.volume = Math.min(bgm.volume + 0.05, 0.4); 
                    } else {
                        clearInterval(fadeAudio); // Dừng việc tăng khi đã đạt mức 0.4
                    }
                }, 200); // Cứ mỗi 0.2 giây lại tăng một chút
            }
        });
    }

    const soundToggle = document.getElementById('sound-toggle');
    let isSoundOn = true; // Mặc định là bật âm thanh

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            // Đảo ngược trạng thái
            isSoundOn = !isSoundOn; 
            
            // Đổi chữ hiển thị
            soundToggle.innerText = isSoundOn ? "[ SOUND: ON ]" : "[ SOUND: OFF ]";
            
            // Tìm TẤT CẢ các thẻ audio có trên trang web
            const allAudios = document.querySelectorAll('audio');
            
            // Lặp qua từng thẻ và thiết lập thuộc tính 'muted' (tắt tiếng)
            allAudios.forEach(audio => {
                audio.muted = !isSoundOn; 
            });

            console.log("Trạng thái âm thanh:", isSoundOn ? "BẬT" : "TẮT");
        });
    }

    // Bật tắt đèn
    const handleSwitch = (isTurningOn) => {
        const switchSnd = document.getElementById('switch');
        if (switchSnd) { switchSnd.currentTime = 0; switchSnd.play(); }
        if (flash) {
            flash.style.backgroundColor = isTurningOn ? "white" : "black";
            flash.classList.remove('animate-flash');
            void flash.offsetWidth;
            flash.classList.add('animate-flash');
        }
        setTimeout(() => {
            if (roomOff) roomOff.style.display = isTurningOn ? 'none' : 'block';
            if (roomOn) roomOn.style.display = isTurningOn ? 'block' : 'none';
        }, 50);
    };

    if (fanOn) fanOn.addEventListener('click', () => handleSwitch(false));
    if (fanOff) fanOff.addEventListener('click', () => handleSwitch(true));

    // Gõ cửa
    if (door) {
        door.addEventListener('click', () => {
            const knock = document.getElementById('knocking');
            if (knock) { knock.currentTime = 0; knock.play(); }
        });
    }

    // CLICK LOGO (KHÔI PHỤC TẠI ĐÂY)
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.display = 'none';
            if (câu1) câu1.style.display = 'none';
            if (câu1b) câu1b.style.display = 'none';
            if (câu2) câu2.style.display = 'block';
            if (câu2b) câu2b.style.display = 'block';
            if (wardrobe) wardrobe.classList.add('unlocked');
        });
    }

    // Mở tủ quần áo
    if (wardrobe) {
        wardrobe.addEventListener('click', () => {
            if (wardrobe.classList.contains('unlocked')) {
                if (eyesImage) eyesImage.style.display = 'block';
                if (câu3) câu3.style.display = 'block';
            }
        });
    }

    // Pounced Reset Game
    if (pouncedTrigger) {
        pouncedTrigger.addEventListener('click', () => {
            const pSnd = document.getElementById('pounced-snd');
            if (pSnd) { pSnd.currentTime = 0; pSnd.play(); }
            
            if (flash) {
                flash.classList.add('animate-red-flash');
                document.body.classList.add('apply-shake');
            }

            setTimeout(() => {
                document.body.classList.remove('apply-shake');
                if (flash) flash.classList.remove('animate-red-flash');
                
                // Tráo khung & Quay về phòng sáng
                const frameOn = document.getElementById('on');
                if (frameOn) frameOn.src = 'image/sec1/khung-off.PNG';
                
                handleSwitch(true); // Bật đèn lại
                if (logo) logo.style.display = 'block';
                if (eyesImage) eyesImage.style.display = 'none';
                if (câu1) câu1.style.display = 'block';
                if (câu1b) câu1b.style.display = 'block';
                if (câu2) câu2.style.display = 'none';
                if (câu2b) câu2b.style.display = 'none';
                if (câu3) câu3.style.display = 'none';
                if (wardrobe) wardrobe.classList.remove('unlocked');
            }, 1000);
        });
    }

    // --- 4. LOGIC SECTION 2 ---
    // --- LOGIC CHO MENU ---
// --- LOGIC CHO THỰC ĐƠN (MENU) ---
const menuBtn = document.getElementById('menu-trigger');
const menuView = document.getElementById('menu-view');

if (menuBtn && menuView) {
    // Click hiện thực đơn
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn việc bấm xuyên xuống dưới
        menuView.style.display = 'flex';
    });

    // Bấm bất kỳ đâu để tắt
    menuView.addEventListener('click', () => {
        menuView.style.display = 'none';
    });
}

    // Girl Bubble
    if (girl && bubble) {
        girl.addEventListener('click', (e) => {
            e.stopPropagation();
            bubble.classList.toggle('show');
        });
    }

    // Mini-game Cục giấy
    const updateDrawing = () => {
        if (!mainDrawing) return;
        if (hasClickedPurple && hasClickedEyes) mainDrawing.src = 'image/sec2/drawing-full.PNG';
        else if (hasClickedPurple) mainDrawing.src = 'image/sec2/drawing-purple.PNG';
        else if (hasClickedEyes) mainDrawing.src = 'image/sec2/drawing-eyes.PNG';
        else mainDrawing.src = 'image/sec2/drawing-none.PNG';
    };

    if (paper && drawingView) {
        paper.addEventListener('click', (e) => {
            e.stopPropagation();
            drawingView.style.display = 'flex';
        });
        drawingView.addEventListener('click', () => { drawingView.style.display = 'none'; });
    }

    if (wordPurple) {
        wordPurple.addEventListener('click', (e) => {
            e.stopPropagation();
            if (hasClickedPurple) return;
            hasClickedPurple = true;
            wordPurple.classList.add('clicked');
            updateDrawing();
        });
    }

    if (wordEyes) {
        wordEyes.addEventListener('click', (e) => {
            e.stopPropagation();
            if (hasClickedEyes) return;
            hasClickedEyes = true;
            wordEyes.classList.add('clicked');
            updateDrawing();
        });
    }

// --- 1. Lấy element âm thanh vừa thêm ---
const crumbleSnd = document.getElementById('crumble-snd');

// --- 2. Thêm sự kiện hover (mouseenter) cho cục giấy ---
if (paper && crumbleSnd) {
    paper.addEventListener('mouseenter', () => {
        // Reset lại thời gian về 0 để âm thanh phát lại từ đầu mỗi lần hover
        crumbleSnd.currentTime = 0; 
        
        // Phát âm thanh, dùng catch để tránh lỗi nếu trình duyệt chặn tự động phát
        crumbleSnd.play().catch(error => {
            console.log("Trình duyệt chặn phát âm thanh tự động:", error);
    });
        paper.addEventListener('mouseleave', () => {
        crumbleSnd.pause();
        });
    });
}

    // Scroll Parallax
    window.addEventListener('scroll', () => {
        if (!section2) return;
        let value = window.scrollY;
        let s2Top = section2.offsetTop;

        if (value >= s2Top) {
            let relativeValue = value - s2Top;
            if (girl) girl.style.top = (350 + relativeValue * 0.3) + 'px';
            if (bubble) bubble.style.top = (310 + relativeValue * 0.3) + 'px';
            const p1 = document.querySelector('.plushie-1');
            const p2 = document.querySelector('.plushie-2');
            if (p1) p1.style.top = (450 + relativeValue * 0.5) + 'px';
            if (p2) p2.style.top = (480 + relativeValue * 0.4) + 'px';
        } else {
            if (girl) girl.style.top = '400px';
            if (bubble) bubble.style.top = '360px';
        }
    });

    // Kéo gấu bông
    const p1 = document.querySelector('.plushie-1');
    const p2 = document.querySelector('.plushie-2');
    const s1 = document.getElementById('squeak-snd');
    const s2 = document.getElementById('squeak2-snd');
    makeHorizontalDraggableWithSound(p1, s1);
    makeHorizontalDraggableWithSound(p2, s2);
});

// Hàm kéo gấu bông
function makeHorizontalDraggableWithSound(el, snd) {
    if (!el) return;
    let isDragging = false, startX, currentX = 0;
    el.addEventListener('mousedown', (e) => {
        if (snd) { snd.currentTime = 0; snd.play(); }
        isDragging = true;
        startX = e.clientX - currentX;
        el.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        el.style.transform = `translateX(${currentX}px)`;
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        el.style.cursor = 'grab';
    });
}
// --- LOGIC RIÊNG CHO SECTION 3 & CÁC TƯƠNG TÁC BỔ SUNG ---
document.addEventListener('DOMContentLoaded', () => {
    // A. Khai báo biến cho Section 3
    const trapOpen = document.getElementById('trap');
    const trapClosed = document.querySelector('.closed-trap');
    const trapSnd = document.getElementById('trap-snd');
    const poemC2 = document.querySelector('.c2-s3');
    const whistleItem = document.getElementById('whistle');
    const whistleSnd = document.getElementById('whistle-snd');
    const poemC3 = document.querySelector('.c3-s3');
    const poemC4 = document.querySelector('.c4-s3');

    // --- LOGIC CHO TỪ CLAP ---
const clapTrigger = document.getElementById('clap-trigger');
const clapSnd = document.getElementById('clap-snd');
const flashElement = document.getElementById('light-flash'); // Dùng chung cái flash của sec 1

if (clapTrigger) {
    clapTrigger.addEventListener('click', () => {
        // 1. FLASH LÊN ĐẦU TIÊN (Ưu tiên số 1)
        if (flashElement) {
            // Reset triệt để các class cũ
            flashElement.classList.remove('animate-flash', 'animate-flash-long', 'animate-flash-instant');
            void flashElement.offsetWidth; // Ép trình duyệt vẽ lại ngay lập tức
            flashElement.classList.add('animate-flash-instant');
        }

        // 2. RUNG MÀN HÌNH (Đi kèm với ánh sáng)
        document.body.classList.add('apply-shake-medium');

        // 3. Âm thanh vỗ tay (Phát sau một tí xíu - tính bằng mili giây)
        if (clapSnd) {
            clapSnd.currentTime = 0;
            clapSnd.play();
        }

        // Dừng rung sau 0.4s
        setTimeout(() => {
            document.body.classList.remove('apply-shake-medium');
        }, 400);
    });
}
    let isTrapSnapped = false; 
    let isWhistleTriggered = false;

    // B. Logic Bật/Tắt Monster Hint (Section 2)
    const sizeSentence = document.querySelector('.size-sentence');
    const monsterHint = document.querySelector('.monsterhint');

    if (sizeSentence && monsterHint) {
        sizeSentence.addEventListener('click', () => {
            // Kiểm tra trạng thái display để bật/tắt
            if (monsterHint.style.display === 'block') {
                monsterHint.style.display = 'none';
            } else {
                monsterHint.style.display = 'block';
            }
        });
    }

    // C. Logic cuộn chuột cho Section 3
    window.addEventListener('scroll', () => {
        const triggerPoint = window.innerHeight * 0.6; 

        // 1. Kiểm tra Bẫy (Chạy độc lập)
        if (trapOpen && !isTrapSnapped) {
            const trapPos = trapOpen.getBoundingClientRect().top;
            if (trapPos < triggerPoint) {
                isTrapSnapped = true;
                if (trapSnd) { trapSnd.currentTime = 0; trapSnd.play(); }
                trapOpen.style.display = 'none';
                if (trapClosed) trapClosed.style.display = 'block';
                if (poemC2) poemC2.classList.add('visible');
                console.log("Bẫy sập!");
            }
        }

        // 2. Kiểm tra Còi (Chạy độc lập - Đã đưa ra ngoài bẫy)
        if (whistleItem && !isWhistleTriggered) {
            const whistlePos = whistleItem.getBoundingClientRect().top;
            if (whistlePos < triggerPoint) {
                isWhistleTriggered = true;
                if (whistleSnd) { whistleSnd.currentTime = 0; whistleSnd.play(); }
                if (poemC3) poemC3.classList.add('visible');
                if (poemC4) poemC4.classList.add('visible');
                console.log("Còi kêu!");
            }
        }
    }); // Kết thúc scroll

const sec4Container = document.getElementById('sec4-container');
    const chatboxS4 = document.getElementById('chatbox-sec4');
    const closetClosed = document.getElementById('closet-closed');
    const closetOpened = document.getElementById('closet-opened');
    const poemText = document.getElementById('sec4-poem');
    const nextHint = document.querySelector('.next-hint');
    const closetSnd = document.getElementById('closet-snd');

    // Khai báo thêm các element SVG thở (Huff, And, Puff)
    const huffElement = document.querySelector('.huff');
    const andElement = document.querySelector('.and');
    const puffElement = document.querySelector('.puff');

    // 2. Logic hiện Chatbox khi lướt tới Section 4
// 2. Logic ẩn hiện Chatbox (Bản siêu nhạy)
    window.addEventListener('scroll', () => {
        if (sec4Container && chatboxS4) {
            const rect = sec4Container.getBoundingClientRect();
            
            // Hiện ra khi đỉnh Sec 4 vào 70% màn hình
            const startTrigger = window.innerHeight * 0.7;
            
            // ẨN ĐI NHANH HƠN: 
            // Thay vì 200, hãy để hẳn 600 hoặc 700. 
            // Số này càng lớn, Chatbox sẽ mất càng sớm khi bạn cuộn xuống.
            const endTrigger = 400; 

            if (rect.top < startTrigger && rect.bottom > endTrigger) {
                chatboxS4.classList.add('active');
            } else {
                chatboxS4.classList.remove('active');
            }
        }
    });

    // 3. Logic Click mở tủ (Bước 1)
    if (closetClosed) {
        closetClosed.addEventListener('click', () => {
            // Phát âm thanh
            if (closetSnd) {
                closetSnd.currentTime = 0;
                closetSnd.play();
            }

            // Tráo đổi hình ảnh tủ
            closetClosed.style.display = 'none';
            if (closetOpened) {
                closetOpened.style.display = 'block';
            }

            // Đổi thơ kèm hiệu ứng
            changePoemWithAnimation("...there was nothing there but stuff.");

            // Hiện gợi ý nhấn X kèm animation fade in (sử dụng Class CSS)
            if (nextHint) {
                nextHint.classList.add('hint-fade-in'); 
            }

            // Cập nhật bước câu chuyện lên 1
            s4StoryStep = 1; 
            console.log("Đã mở tủ - Bước 1");
        });
    }

    // 4. Logic nhấn phím X để chuyển lời thơ (Bước 2 & 3)
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'x') {
            
            // Nếu đã mở tủ (Bước 1), nhấn X để sang Bước 2
            if (s4StoryStep === 1) {
                changePoemWithAnimation("I know that monster's in there!");
                s4StoryStep = 2;
                console.log("Nhấn X lần 1 - Bước 2");
            } 
            
            // NHẤN X LẦN TIẾP THEO: Sang Bước 3 (Hiện Huff & Puff)
            else if (s4StoryStep === 2) {
                // Đổi thơ thành "I heard him..." theo yêu cầu mới của bạn
                changePoemWithAnimation("I heard him...");
                
                // Kích hoạt class animation cho các SVG đã khai báo
                if (huffElement) huffElement.classList.add('is-breathing');
                if (andElement) andElement.classList.add('is-breathing');
                if (puffElement) puffElement.classList.add('is-breathing');

                s4StoryStep = 3;
                console.log("Nhấn X lần 2 - Bước 3 (Huff & Puff hiện lên)");
            }
        }
    });
    
    // 5. Hàm hỗ trợ đổi chữ có animation (Định nghĩa 1 lần duy nhất)
    function changePoemWithAnimation(newText) {
        const pText = document.getElementById('sec4-poem');
        if (!pText) return;

        pText.classList.remove('animate-text');
        void pText.offsetWidth; // Force reflow - Mẹo để restart animation CSS
        pText.innerText = newText;
        pText.classList.add('animate-text');
    }
const sec4 = document.getElementById('sec4-container');
const flashlight = document.getElementById('sec4-flashlight');

if (sec4 && flashlight) {
    sec4.addEventListener('mousemove', (e) => {
        // Lấy tọa độ chuột tương đối so với Section 4
        const rect = sec4.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Cập nhật tọa độ vào biến CSS
        flashlight.style.setProperty('--mouse-x', `${x}px`);
        flashlight.style.setProperty('--mouse-y', `${y}px`);
    });
}

// --- LOGIC HIỆN RÈM FIXED CHO SECTION 5 ---
const curtainElement = document.querySelector('.curtain');
const sec5a = document.getElementById('sec5a-container');

window.addEventListener('scroll', () => {
    if (sec5a && curtainElement) {
        const rectA = sec5a.getBoundingClientRect();
        
        // Điểm kích hoạt: Khi đỉnh Section 5a lọt vào 30% màn hình
        const triggerPoint = window.innerHeight * 0.3; 

        if (rectA.top < triggerPoint) {
            // Khi đã lướt tới Sec 5: Hiện rèm và giữ nguyên đó
            curtainElement.classList.add('active');
        } else {
            // Chỉ mất đi khi người chơi cuộn ngược hẳn lên Section 4
            curtainElement.classList.remove('active');
        }
    }
});

    const monsterImg = document.getElementById('monster');
    const monsterSound = document.getElementById('monster-snd');

    if (monsterImg && monsterSound) {
    monsterImg.addEventListener('mouseenter', () => {
        monsterSound.currentTime = 0;
        monsterSound.play();
        console.log("Gàooooo!");
    });
    monsterImg.addEventListener('mouseleave', () => {
        monsterSound.pause();
    });
}
    const lidElement = document.querySelector('.lid');
    const lidPoem = document.getElementById('lid-poem');

    if (lidElement && lidPoem) {
        // Khi rê chuột vào nắp nồi
        lidElement.addEventListener('mouseenter', () => {
            lidPoem.classList.add('show');
            console.log("Đang nhìn cái nắp nồi...");
        });

        // Khi bỏ chuột ra (Nếu bạn muốn nó mất đi)
        lidElement.addEventListener('mouseleave', () => {
            lidPoem.classList.remove('show');
        });
    }

   const girlTrigger = document.getElementById('girl-trigger'); // girl-stand
    const girlScream = document.getElementById('girl-scream-img');
    const spriteFX = document.getElementById('go-away-sprite');

    // ... (logic intro, cuộn chuột khác giữ nguyên) ...

    // --- LOGIC HOVER CÔ BÉ (FIX CHÍNH TẠI ĐÂY) ---
    if (girlTrigger && spriteFX) {
        
        // KHI RÊ CHUỘT VÀO
        girlTrigger.addEventListener('mouseenter', () => {
            // 1. Tráo đổi ảnh: Stand tàng hình (vẫn hứng hover) - Scream hiện
            girlTrigger.style.opacity = '0.01'; // Dùng 0.01 thay vì 0
            if (girlScream) girlScream.style.opacity = '1';

            // 2. Chạy Sprite forward
            spriteFX.classList.remove('animate-backward'); // Xóa class chạy ngược
            
            // Mẹo: Force reflow để reset animation
            void spriteFX.offsetWidth; 
            
            spriteFX.classList.add('animate-forward'); // Thêm class chạy xuôi
            
            console.log("Di chuột vào cô bé!");
        });

        // KHI BỎ CHUỘT RA
        girlTrigger.addEventListener('mouseleave', () => {
            // 1. Tráo đổi ảnh: Stand hiện lại - Scream tàng hình
            girlTrigger.style.opacity = '1';
            if (girlScream) girlScream.style.opacity = '0';

            // 2. Chạy Sprite run backward
            spriteFX.classList.remove('animate-forward'); // Xóa class chạy xuôi
            
            // Mẹo: Force reflow
            void spriteFX.offsetWidth; 
            
            spriteFX.classList.add('animate-backward'); // Thêm class chạy ngược
            
            // 3. Xóa class sau khi chạy xong để FX tàng hình
            // (Phải đợi 0.6s bằng thời gian animation)
            setTimeout(() => {
                // Kiểm tra lại nếu chuột không đang hover vào
                if (!girlTrigger.matches(':hover')) {
                    spriteFX.classList.remove('animate-backward');
                }
            }, 600);
            
            console.log("Rời chuột khỏi cô bé!");
        });
    }
    const monsterB = document.getElementById('monsterb-img'); // Đảm bảo HTML đã có ID này
    const glitchSprite = document.getElementById('glitch-sprite');
    const snd1 = document.getElementById('goaway1-snd');
    const snd2 = document.getElementById('goaway2-snd');

    if (girlTrigger) {
        girlTrigger.addEventListener('click', () => {
            
            // 1. ẨN QUÁI VẬT B
            if (monsterB) {
                monsterB.style.opacity = '0';
                // Sau khi mờ hẳn thì xóa hẳn khỏi luồng hiển thị
                setTimeout(() => { monsterB.style.display = 'none'; }, 300);
            }

            // 2. HIỆN GLITCH & PHÁT ÂM THANH
            if (glitchSprite) {
                glitchSprite.classList.add('active');
            }

            if (snd1 && snd2) {
                snd1.currentTime = 0;
                snd2.currentTime = 0;
                snd1.play();
                snd2.play();
            }

            // 3. RUNG MÀN HÌNH
            document.body.classList.add('apply-light-shake');

            // 4. KẾT THÚC (Sau 1.5 giây)
            setTimeout(() => {
                document.body.classList.remove('apply-light-shake');
                if (glitchSprite) {
                    glitchSprite.classList.remove('active');
                }
            }, 1500);

            console.log("Đã ẩn MonsterB và chạy Glitch 13 frames");
        });
    }
}); // Kết thúc DOMContentLoaded

