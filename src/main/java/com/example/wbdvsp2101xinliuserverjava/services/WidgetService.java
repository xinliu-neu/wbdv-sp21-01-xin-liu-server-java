package com.example.wbdvsp2101xinliuserverjava.services;

import com.example.wbdvsp2101xinliuserverjava.models.Widget;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {
  private List<Widget> widgets = new ArrayList<Widget>();

  public Widget createWidget(String tid, Widget widget) {
    widget.setTopicId(tid);
    widget.setId((new Date()).getTime());
    widgets.add(widget);
    return widget;
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    List<Widget> ws = new ArrayList<Widget>();
    for (Widget w : widgets) {
      if (w.getTopicId().equals(tid)) {
        ws.add(w);
      }
    }
    return ws;
  }

  public int updateWidget(String wid, Widget widget) {
    for (int i = 0; i < widgets.size(); i++) {
      if (widgets.get(i).getId().equals(Long.parseLong(wid))) {
        widgets.set(i, widget);
        return 1;
      }
    }
    return -1;
  }

  public int deleteWidget(String wid) {
    int index = -1;
    for (int i = 0; i < widgets.size(); i++) {
      if (widgets.get(i).getId().equals(Long.parseLong(wid))) {
        index = i;
        widgets.remove(index);
        return 1;
      }
    }
    return -1;
  }

  public List<Widget> findAllWidgets() {
    return widgets;
  }
}
