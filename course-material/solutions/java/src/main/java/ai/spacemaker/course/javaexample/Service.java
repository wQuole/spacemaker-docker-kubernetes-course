package ai.spacemaker.course.javaexample;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class Service {

  @RequestMapping("/")
  public List<Building> buldings() {
    return Collections.singletonList(new Building(0.0, 0.0, 20.0, 20.0, 9.0));
  }

}
