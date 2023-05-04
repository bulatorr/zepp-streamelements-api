import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";


const { messageBuilder } = getApp()._options.globalData

Page({
  state: {},
  label: null,
  build() {
	label = hmUI.createWidget(hmUI.widget.TEXT, {
		x: 0,
		y: 100,
		w: 192,
		h: 290,
		text: "Press button",
		color: 0xffffff,
		text_size: 16,
		text_style: hmUI.text_style.WRAP,
	});
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 390,
      w: 192,
      h: 100,
      text_size: 16,
      radius: 0,
      normal_color: DEFAULT_COLOR,
      press_color: DEFAULT_COLOR_TRANSPARENT,
      text: "Get Data",
      click_func: (button_widget) => {
        this.fetchData();
      },
    });
  },
  fetchData() {
    messageBuilder.request({
      method: "GET_DATA",
    })
    .then(data => {
      const { result = {} } = data
      const { text } = result
	  label.setProperty(hmUI.prop.MORE, {
		  text: text,
	  });
    })
  },
});
