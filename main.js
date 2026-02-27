
      AOS.init({ once: true, offset: 100, duration: 800 });

      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const navMenu = document.getElementById('navMenu');

      mobileMenuBtn.addEventListener('click', () => {
          navMenu.classList.toggle('hidden');
      });

      document.getElementById('year').textContent = new Date().getFullYear();

      const text = "TRUE FITNESS - ПРЕМИУМ ТРЕНАЖЕРЫ ИЗ США";
      const typeWriterElement = document.getElementById('typewriter');
      let i = 0;
      typeWriterElement.innerHTML = "";

      function typeWriter() {
        if (i < text.length) {
          typeWriterElement.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }
      setTimeout(typeWriter, 500);

      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const phoneInput = document.getElementById('phoneInput');
      const submitBtn = document.getElementById('submitBtn');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const phoneError = document.getElementById('phoneError');
      const notification = document.getElementById('notification');
      const notificationText = document.getElementById('notificationText');
      
      let isSubmitted = false;

      function showNotification(text, isError = false) {
          notificationText.innerText = text;
          notification.className = `fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 shadow-xl transition-all duration-300 z-50 flex items-center gap-3 w-max ${isError ? 'bg-red-500' : 'bg-[#01AEE7]'} text-white opacity-100 pointer-events-auto`;
          
          setTimeout(() => {
              notification.classList.add('opacity-0', 'pointer-events-none');
          }, 3000);
      }

      function toggleError(element, show, errorSpan) {
          if (show) {
              element.classList.add('bg-red-50');
              element.classList.remove('bg-[#F0F0F0]');
              errorSpan.classList.remove('hidden');
          } else {
              element.classList.remove('bg-red-50');
              element.classList.add('bg-[#F0F0F0]');
              errorSpan.classList.add('hidden');
          }
      }

      nameInput.addEventListener('input', () => {
          if (nameInput.value.length >= 3) toggleError(nameInput, false, nameError);
      });

      emailInput.addEventListener('input', () => {
          if (emailInput.value.includes('@')) toggleError(emailInput, false, emailError);
      });

      phoneInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '');
          const maxDigits = 9;
          if (value.length > maxDigits) value = value.slice(0, maxDigits);

          let formattedValue = '';
          if (value.length > 0) formattedValue += '(' + value.substring(0, 2);
          if (value.length > 2) formattedValue += ')-' + value.substring(2, 5);
          if (value.length > 5) formattedValue += '-' + value.substring(5, 7);
          if (value.length > 7) formattedValue += '-' + value.substring(7, 9);

          e.target.value = formattedValue;

          if (value.length === maxDigits) toggleError(phoneInput, false, phoneError);
      });

      submitBtn.addEventListener('click', () => {
          if (isSubmitted) {
              showNotification('Вы уже отправили заявку!', true);
              return;
          }

          let isValid = true;

          if (nameInput.value.length < 3) {
              toggleError(nameInput, true, nameError);
              isValid = false;
          }

          if (!emailInput.value.includes('@')) {
              toggleError(emailInput, true, emailError);
              isValid = false;
          }

          const phoneDigits = phoneInput.value.replace(/\D/g, '').length;
          if (phoneDigits !== 9) {
              toggleError(phoneInput, true, phoneError);
              isValid = false;
          }

          if (isValid) {
              isSubmitted = true;
              submitBtn.innerText = 'ОТПРАВКА...';
              submitBtn.disabled = true;

              setTimeout(() => {
                  showNotification('Данные успешно отправлены!');
                  submitBtn.innerText = 'ОТПРАВЛЕНО';
                  submitBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
                  submitBtn.classList.remove('bg-[#01AEE7]', 'hover:bg-[#0096C7]');
                  
                  nameInput.value = '';
                  emailInput.value = '';
                  phoneInput.value = '';
              }, 1000);
          } else {
              submitBtn.classList.add('animate-pulse');
              setTimeout(() => submitBtn.classList.remove('animate-pulse'), 500);
          }
      });

      window.onscroll = function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
      };

      const heroText = document.getElementById('typewriter');
      const heroSection = document.getElementById('home');

      heroSection.addEventListener('mousemove', (e) => {
          const { offsetWidth: width, offsetHeight: height } = heroSection;
          let { offsetX: x, offsetY: y } = e;
          
          const xWalk = (x / width * 30) - 15;
          const yWalk = (y / height * 30) - 15;

          heroText.style.transform = `translateX(${xWalk}px) translateY(${yWalk}px)`;
      });