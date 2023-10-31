
export default class Level {
  constructor (updateLevel, updateRandomNumber) {
    this._slider = document.querySelector('.level__seek-slider-value');
    this._sliderEndElement = document.querySelector('.level__value-end');
    this._levelBtn = Array.from(document.querySelectorAll('.level__btn'));
    this._levelBtnInterval = [
      {
        min: 700,
        level: this._levelBtn[2]
      },
      {
        min: 300,
        level: this._levelBtn[1]
      },
      {
        min: 100,
        level: this._levelBtn[0]
      }
    ];
    this._updateLevel = updateLevel;
    this._level = 100;
    this._generateNumberBtn = document.querySelector('.level__generate-btn');
    this._levelHandler = document.querySelector('.level')
    this._randomNumber = 0;
    this._numberSubmitted = false;
    this._updateRandomNumber = updateRandomNumber;
  }

  //update slider value by user
  _handleSeeking(value) {
    const valuePercentage = (value / this._slider.max) * 100 - 5;
    this._slider.style.background = `linear-gradient(to right, #ffd766 ${valuePercentage}%, #77777754 ${valuePercentage}%)`;
    this._sliderEndElement.value = value;
    this._slider.value = value;

    const numberValue = Number(value);
    this._handleLevelBtn(numberValue);
    this._updateLevel(numberValue);
    this._level = numberValue;
  }

  //clear styles of level btns
  _clearLevelBtns() {
    this._levelBtn.forEach(i => i.classList.remove('level__btn_active'));
  }

  _handleLevelBtn(value) {
    this._clearLevelBtns();
    const foundBtn = this._levelBtnInterval.find(i => value >= i.min)?.level;
    if (foundBtn) foundBtn.classList.add('level__btn_active');
  }

  _generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  _toggleELemetsActivity(value) {
    this._slider.disabled = value;
    this._sliderEndElement.disabled = value;

    this._levelBtn.forEach(i => i.disabled = value);
  }

  _submitNumber() {
    if (this._numberSubmitted) {
      this._generateNumberBtn.textContent = 'Загадать число';
      this._levelHandler.classList.remove('level_submitted');
      this._toggleELemetsActivity(false);
      this._numberSubmitted = false;
      this._randomNumber = 0;
    } else {
      this._randomNumber = this._generateRandomNumber(1, this._level);
      this._generateNumberBtn.textContent = 'Изменить число';
      this._levelHandler.classList.add('level_submitted');
      this._toggleELemetsActivity(true);
      this._numberSubmitted = true;
    }
    this._updateRandomNumber(this._randomNumber);
  }

  setEventListeners() {

    this._slider.addEventListener('input', (e) => this._handleSeeking(e.target.value));

    this._sliderEndElement.addEventListener('input', (e) => this._handleSeeking(e.target.value));

    this._sliderEndElement.addEventListener('blur', (e) => {
      const value = e.target.value;
      if (value > 1000) this._handleSeeking(1000);
      if (value < 100) this._handleSeeking(100);
    })

    this._levelBtn.reverse().forEach((i, index) => {
      i.addEventListener('click', () => {
        const value = this._levelBtnInterval[index].min;
        this._handleSeeking(value);
      })
    })

    this._generateNumberBtn.addEventListener('click', () => this._submitNumber());

  }

}
