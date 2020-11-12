/*
package com.fhi360;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.base.domain.entities.Menu;
import org.fhi360.lamis.modules.base.domain.enumeration.MenuType;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public class MenuTest {
    ObjectMapper objectMapper = new ObjectMapper();
    @Test
    public void testJackson() throws JsonProcessingException {
        Set<Menu> menus = new HashSet<>();
        Menu menu = new Menu();
        menu.setName("Administration");
        menu.setState("admin");
        menu.setIcon("settings");
        menu.setType(MenuType.DROP_DOWN);
        menu.setTooltip("Administration");
        Menu sub = new Menu();
        sub.setName("Facilities");
        sub.setState("facilities");
        sub.setType(MenuType.LINK);
        sub.setTooltip("LAMIS Facilities");
        menu.getSubs().add(sub);

        menus.add(menu);
       System.out.println("This is a test: " + objectMapper.writeValueAsString(menus));
    }

    @Test
    public void menuReadTest() throws IOException {
        String menuDef = "[\n" +
            "  {\n" +
            "    \"name\": \"Administration\",\n" +
            "    \"state\": \"admin\",\n" +
            "    \"icon\": \"settings\",\n" +
            "    \"position\": 1,\n" +
            "    \"disabled\": false,\n" +
            "    \"type\": \"dropDown\",\n" +
            "    \"subs\": [\n" +
            "      {\n" +
            "        \"name\": \"Facilities\",\n" +
            "        \"state\": \"facilities\",\n" +
            "        \"position\": 1,\n" +
            "        \"disabled\": false,\n" +
            "        \"type\": \"link\",\n" +
            "        \"authorities\": [\n" +
            "          \"ROLE_USER\",\n" +
            "          \"ROLE_ADMIN\"\n" +
            "        ],\n" +
            "        \"subs\": [\n" +
            "          {\n" +
            "            \"name\": \"Active\",\n" +
            "            \"state\": \"active\",\n" +
            "            \"position\": 1,\n" +
            "            \"disabled\": false,\n" +
            "            \"type\": \"link\"\n" +
            "          }\n" +
            "        ]\n" +
            "      }\n" +
            "    ]\n" +
            "  }\n" +
            "]";

        Set<Menu> menus = objectMapper.readValue(menuDef,  new TypeReference<Set<Menu>>(){});
        menus = menus.stream()
            .peek(menuItem -> menuItem.setId(1L))
            .peek(menu -> {
                List<Menu> subs1 = menu.getSubs();
                subs1 = subs1.stream()
                    .peek(sub -> sub.setId(menu.getId()))
                    .peek(sub -> {
                        List<Menu> subs2 = sub.getSubs();
                        subs2 = subs2.stream()
                            .peek(sub2 -> sub2.setId(menu.getId()))
                            .collect(Collectors.toList());
                        sub.getSubs().clear();
                        sub.getSubs().addAll(subs2);
                    })
                    .collect(Collectors.toList());
                menu.getSubs().clear();
                menu.getSubs().addAll(subs1);
            })
            .collect(Collectors.toSet());
        System.out.println("Menu: " + menus);
    }
}
*/
