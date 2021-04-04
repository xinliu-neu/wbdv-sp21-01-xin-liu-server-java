package com.example.wbdvsp2101xinliuserverjava.services;

import com.example.wbdvsp2101xinliuserverjava.models.Widget;
import com.example.wbdvsp2101xinliuserverjava.repositories.WidgetRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {
  @Autowired
  WidgetRepository repository;

  public Widget createWidget(String tid, Widget widget) {
    widget.setTopicId(tid);
    return repository.save(widget);
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    return repository.findWidgetsForTopic(tid);
  }

  public int updateWidget(String wid, Widget widget) {
    Widget originalWidget = repository.findById(Long.parseLong(wid)).get();
    originalWidget.setText(widget.getText());
    originalWidget.setType(widget.getType());
    originalWidget.setHeight(widget.getHeight());
    originalWidget.setWidth(widget.getWidth());
    originalWidget.setSize(widget.getSize());
    originalWidget.setSrc(widget.getSrc());
    originalWidget.setOrdered(widget.getOrdered());
    repository.save(originalWidget);
    return 1;
  }

  public void deleteWidget(String wid) {
    repository.deleteById(Long.parseLong(wid));
  }

  public List<Widget> findAllWidgets() {
    return (List<Widget>) repository.findAll();
  }

  public Widget findWidgetById(String wid) {
    Widget foundWidget = repository.findById(Long.parseLong(wid)).get();
    if (foundWidget == null) {
      return new Widget();
    }
    return foundWidget;
  }
}
