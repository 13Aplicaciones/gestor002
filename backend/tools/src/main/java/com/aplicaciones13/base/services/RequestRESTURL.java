package com.aplicaciones13.base.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.cert.X509Certificate;
import java.util.Date;

import javax.net.ssl.HostnameVerifier;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

/**
 * Clase que permite realizar una solicitud a una URL con JSON de entrada y de
 * salida
 *
 * @author omargo33
 * @since 2020-08-17
 * 
 */
@Getter
@Setter
public class RequestRESTURL {

    private int timeOut;
    
    @Setter(AccessLevel.NONE)
    private int httpStatus = 0;

    private String ipProxy;
    private String portProxy;
    private String pathCertificate;
    private String claveCertificate;

    private String jsonQuery;
    
    private String urlQuery;

    @Setter(AccessLevel.NONE)
    private String jsonResponse;
    
    @Setter(AccessLevel.NONE)
    private String errorResponse;

    @Setter(AccessLevel.NONE)
    private final Date startDate;
        
    @Setter(AccessLevel.NONE)
    private Date endDate;

    /**
     * Metodo para crear el objeto.
     *
     */
    public RequestRESTURL() {
        super();
        timeOut = 0;
        httpStatus = 0;
        jsonQuery = "";
        urlQuery = "";
        jsonResponse = "";
        ipProxy = "";
        portProxy = "";
        pathCertificate = "";
        claveCertificate = "";
        startDate = new Date();
        endDate = new Date();
    }

    /**
     * Metodo para ejecutar una solicitud SOAP a un web services.
     *
     * Proceso el ingreso a sitios SSL. Inicializa mensajes de error Inicializa
     * datos para la conexion. Prepara a la conexion para enviar, recibir datos
     * y tiempos de espera en conexion y de escritura. Abre el puerto output y
     * envia el xml a ser consultado y cierra el puerto. Pregunta el estado de
     * la response. Si la response es HTTP_OK estado html 200 "response ok
     * del servidor consultado" Lee el contendio del imputStream Caso contrario
     * Lee el contenido del imputStream de Error
     *
     * Consume el contenido del imputStream y pasa a un responseSOAP Cierra la
     * conexion al servidor.
     *
     * Si existio un error en el servidor lo notifica Devuelve el valor de la
     * Query al web service.
     *
     * @throws Exception
     *
     */
    public void executeQueryWebService() throws Exception {
        String responseString = "";
        String response = "";
        InputStream inputStream = null;

        bypassSSL();
        sendByProxy();
        addCertificateSSL();

        HttpURLConnection connection = generateConnection();
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setConnectTimeout(getTimeOut());
        connection.setReadTimeout(getTimeOut());

        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(connection.getOutputStream());
        outputStreamWriter.write(jsonQuery);
        outputStreamWriter.close();

        httpStatus = connection.getResponseCode();

        if (getHttpStatus() != HttpURLConnection.HTTP_OK) {
            inputStream = connection.getErrorStream();
        } else {
            inputStream = connection.getInputStream();
        }

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder stringBuilder = new StringBuilder();

        while ((responseString = bufferedReader.readLine()) != null) {
            stringBuilder.append(responseString);
        }

        response = stringBuilder.toString();
        bufferedReader.close();
        endDate = new Date();
        cleanProxy();

        if (getHttpStatus() != HttpURLConnection.HTTP_OK) {
            errorResponse = response;
            throw new Exception(String.valueOf(getHttpStatus()));
        }

        jsonResponse = response;
    }

    /**
     * Metodo para crear una nueva conexion.
     *
     * Se la puede sobrecargar.
     *
     * @return
     * @throws MalformedURLException
     * @throws IOException
     */
    public HttpURLConnection generateConnection() throws IOException {
        URL url = new URL(this.urlQuery);
        return (HttpURLConnection) url.openConnection();
    }

    /**
     * Metodo para hacer la solicitud por un proxy
     *
     */
    private void sendByProxy() {
        if (ipProxy != null && !ipProxy.isEmpty()) {
            System.setProperty("http.proxyHost", ipProxy);
            System.setProperty("https.proxyHost", ipProxy);
            if (portProxy != null && !portProxy.isEmpty()) {
                System.setProperty("http.proxyPort", portProxy);
                System.setProperty("https.proxyPort", portProxy);
            }
        }
    }

    /**
     * Metodo para agregar certificate SSL.
     *
     */
    private void addCertificateSSL() {
        if (pathCertificate != null && !pathCertificate.isEmpty()) {
            System.setProperty("javax.net.ssl.trustStoore", pathCertificate);
            if (claveCertificate != null && !claveCertificate.isEmpty()) {
                System.setProperty("javax.net.ssl.keyStorePassword", claveCertificate);
            }
        }
    }

    /**
     * Metodo para limpiar el proxy.
     */
    private void cleanProxy() {
        if (ipProxy != null && !ipProxy.isEmpty()) {
            System.clearProperty("http.proxyHost");
            System.clearProperty("https.proxyHost");
        }
    }

    /**
     * Metodo para no comprobar el SSL de un servidor.
     *
     * 
     * @throws Exception
     */
    private void bypassSSL() throws Exception {
        TrustManager[] trustAllCerts;
        trustAllCerts = new TrustManager[] { new X509TrustManager() {
            @Override
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }

            /**
             * Metodo para no comprobar el SSL de un servidor.
             * 
             * @param certs
             * @param authType
             */
            @Override
            public void checkClientTrusted(X509Certificate[] certs, String authType) {
            }

            /**
             * Metodo para no comprobar el SSL de un servidor.
             * 
             * @param certs
             * @param authType
             */
            @Override
            public void checkServerTrusted(X509Certificate[] certs, String authType) {
            }
        }
        };

        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());

        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

        HostnameVerifier allHostsValid = new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }            
        };
        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
    }

    /**
     * @return
     */
    public int getTimeOut() {
        return (timeOut == 0) ? 15000 : timeOut;
    }

}