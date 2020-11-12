package org.lamisplus.restart.web;

import org.lamisplus.LamisApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestartController {

    @GetMapping("/restart")
    public void restart() {
        LamisApplication.restart();
    }
}
