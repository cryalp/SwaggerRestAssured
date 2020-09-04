package com.example.springboot;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HelloController {
    @RequestMapping(value = "/Anasayfa", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String AnasayfaGET() {
        return "har";
    }

    @RequestMapping(value = "/Anasayfa/GirisYap", params = {"EPosta", "Sifre"}, method = RequestMethod.POST, produces = MediaType.TEXT_HTML_VALUE)
    public String AnasayfaGirisYapPOST(String EPosta, String Sifre) {
        return EPosta + Sifre;
    }

    @RequestMapping(value = "/Kullanici", params = {"KullaniciAd"}, method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String KullaniciGetirGET(String KullaniciAd) {
        return KullaniciAd;
    }

    @RequestMapping(value = "/Mesaj", params = {"OdaAd"}, method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String MesajGET(String OdaAd) {
        return OdaAd;
    }

    @RequestMapping(value = "/Mesaj", params = {"OdaAd", "Mesaj"}, method = RequestMethod.POST, produces = MediaType.TEXT_HTML_VALUE)
    public String MesajPOST(String OdaAd, String Mesaj) {
        return OdaAd + Mesaj;
    }
}
