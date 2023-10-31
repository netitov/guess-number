
export default class Level {
  constructor () {
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
  }

  //update slider value by user
  _handleSeeking(value) {
    const valuePercentage = (value / this._slider.max) * 100 - 5;
    this._slider.style.background = `linear-gradient(to right, #ffd766 ${valuePercentage}%, #77777754 ${valuePercentage}%)`;
    this._sliderEndElement.value = value;
    this._slider.value = value;
    this._handleLevelBtn(value);
  }

  _clearLevelBtns() {
    this._levelBtn.forEach(i => i.classList.remove('level__btn_active'));
  }

  _handleLevelBtn(value) {
    this._clearLevelBtns();
    const foundBtn = this._levelBtnInterval.find(i => value >= i.min)?.level;
    if (foundBtn) foundBtn.classList.add('level__btn_active');
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

  }

}
