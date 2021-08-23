/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.util.List;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URIBuilder;

/**
 *
 * @author Vladimir Aca
 */
public class EndPoints {
    
    public static String generateGetUrl(List<NameValuePair> parameters) {
        try {
            URIBuilder url = new URIBuilder(utils.Constants.BOOK_RESTLET);
            if (parameters.size() > 0) {
                url.addParameters(parameters);
            }
            return url.build().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
    
    public static String generateUrl() {
        try {
            URIBuilder url = new URIBuilder(utils.Constants.BOOK_RESTLET);
            return url.build().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}
