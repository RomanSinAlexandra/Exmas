let isMouseDown = false;

        function handleInput() {
            let age = parseInt(document.getElementById('ageDisplay').value, 10);
            let maxAllowedAge = parseInt(document.getElementById('rangeInput').max, 10);

            document.getElementById('rangeInput').value = age;

            if (age >= maxAllowedAge) {
                document.getElementById('rangeInput').value = maxAllowedAge;
                document.getElementById('ageDisplay').value = maxAllowedAge;
            }
        }

        function handleScroll(event) {
            event.preventDefault();
            let step = event.deltaY > 0 ? -1 : 1;
            let currentValue = parseInt(document.getElementById('rangeInput').value, 10);
            let newValue = currentValue + step;

            newValue = Math.min(Math.max(newValue, 0), 150);

            document.getElementById('rangeInput').value = newValue;

            document.getElementById('ageDisplay').value = newValue;
        }

        function handleMouseDown() {
            isMouseDown = true;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        function handleMouseMove(event) {
            if (isMouseDown) {
                let rangeInput = document.getElementById('rangeInput');
                let rect = rangeInput.getBoundingClientRect();
                let percentage = (event.clientX - rect.left) / rect.width;
                let newValue = Math.round(percentage * (rangeInput.max - rangeInput.min));

                newValue = Math.min(Math.max(newValue, 0), 150);

                rangeInput.value = newValue;
                document.getElementById('ageDisplay').value = newValue;
            }
        }

        function handleMouseUp() {
            isMouseDown = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        function updateAgeDisplay() {
            let birthdate = new Date(document.getElementById('birthdate').value);
            let today = new Date();
            let age = today.getFullYear() - birthdate.getFullYear();

            // Check if the birthday has occurred this year
            if (today.getMonth() < birthdate.getMonth() ||
                (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
                age--;
            }

            document.getElementById('ageDisplay').value = age;
            document.getElementById('rangeInput').value = age;

            // Display zodiac signs
            displayZodiacSigns(birthdate);
        }

        function submitForm() {
    // Get form data
    const birthdate = document.getElementById('birthdate').value;
    const age = document.getElementById('ageDisplay').value;

    // Display zodiac signs
    const zodiacInfo = displayZodiacSigns(new Date(birthdate));

    // Create a new row
    const newRow = document.createElement('tr');

    // Create table cells
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');

    // Set content for cells
    const content = `${birthdate} ${zodiacInfo.chineseZodiac}. ${zodiacInfo.westernZodiac}. Вік - ${age} років`;
    cell1.textContent = 'Дата та знаки: ' + content;
    cell2.textContent = 'Дата народження: ' + birthdate + ', Вік: ' + age;

    // Append cells to the row
    newRow.appendChild(cell1);
    

    // Append the row to the result container
    document.getElementById('resultContainer').appendChild(newRow);

    // Clear the form
    document.getElementById('myForm').reset();

    const audio = document.getElementById('weatherAudio');
        audio.play();
}

        function displayZodiacSigns(birthdate) {
            const year = birthdate.getFullYear();
            const month = birthdate.getMonth() + 1; // Months are zero-indexed
            const day = birthdate.getDate();

            // Chinese zodiac signs
            const chineseZodiacSigns = [
                'Мавпа', 'Півень', 'Собака', 'Свиня', 'Рік Щура', 'Рік Бика',
                'Рік Тигра', 'Рік Кролика', 'Рік Дракона', 'Рік Змії', 'Рік Кінья', 'Рік Кози'
            ];

            // Western zodiac signs
            const westernZodiacSigns = [
                'Козеріг', 'Водолій', 'Риби', 'Овен', 'Телець', 'Близнюки',
                'Рак', 'Лев', 'Діва', 'Терези', 'Скорпіон', 'Стрілець'
            ];

            const chineseZodiac = chineseZodiacSigns[(year - 4) % 12];
            const westernZodiac = calculateWesternZodiacSign(month, day);

            return {
                chineseZodiac: chineseZodiac,
                westernZodiac: westernZodiac
            };
        }

        function calculateWesternZodiacSign(month, day) {
            if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
                return 'Овен';
            } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
                return 'Телець';
            } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
                return 'Близнюки';
            } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
                return 'Рак';
            } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
                return 'Лев';
            } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
                return 'Діва';
            } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
                return 'Терези';
            } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
                return 'Скорпіон';
            } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
                return 'Стрілець';
            } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
                return 'Козеріг';
            } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
                return 'Водолій';
            } else {
                return 'Риби';
            }
        }

        document.getElementById('rangeInput').addEventListener('input', handleInput);
        document.getElementById('ageDisplay').addEventListener('input', handleInput);
        document.getElementById('rangeInput').addEventListener('wheel', handleScroll);
        document.getElementById('rangeInput').addEventListener('mousedown', handleMouseDown);