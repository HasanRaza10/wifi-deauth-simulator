import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Shield, AlertTriangle, Lock } from 'lucide-react';

export default function Learning() {
  const faqs = [
    {
      question: 'What is a deauthentication attack?',
      answer: 'A deauthentication attack is a type of denial-of-service attack that targets Wi-Fi communications by sending deauth frames to disconnect clients from access points. It exploits a vulnerability in the 802.11 protocol where management frames are not encrypted or authenticated. Our app only simulates these attacks visually for educational purposes - no real packets are transmitted.',
    },
    {
      question: 'How can I protect my Wi-Fi network?',
      answer: 'To protect your Wi-Fi network: 1) Use WPA3 encryption (or strong WPA2 if WPA3 isn\'t available), 2) Disable WPS (Wi-Fi Protected Setup), 3) Regularly update router firmware, 4) Use strong, unique passphrases, 5) Enable MAC address filtering if needed, 6) Hide your SSID (though this provides minimal security), 7) Consider using enterprise-grade security for business networks.',
    },
    {
      question: 'Is packet injection legal?',
      answer: 'Packet injection and wireless attacks are generally illegal without explicit authorization from the network owner. These activities can violate computer fraud laws, wiretapping laws, and terms of service. Always follow local laws, institutional guidelines, and obtain proper authorization before conducting any security testing. This tool is designed for educational purposes only.',
    },
    {
      question: 'What are the signs of a Wi-Fi attack?',
      answer: 'Signs of a Wi-Fi attack include: frequent disconnections, slow internet speeds, unknown devices on your network, unusual network traffic, inability to connect to known networks, and unexpected authentication requests. Monitor your network regularly and use network monitoring tools to detect suspicious activity.',
    },
    {
      question: 'How do real security professionals test Wi-Fi security?',
      answer: 'Professional penetration testers use authorized, controlled environments with proper documentation and consent. They follow ethical guidelines, use legitimate tools like Kali Linux, conduct tests during agreed timeframes, document all activities, and provide detailed reports with remediation recommendations. They never test on networks they don\'t own or lack permission to test.',
    },
  ];

  const resources = [
    {
      title: 'OWASP Top 10',
      url: 'https://owasp.org/www-project-top-ten/',
      description: 'The most critical web application security risks',
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: 'NIST Password Guidelines',
      url: 'https://pages.nist.gov/800-63-3/',
      description: 'Official guidelines for digital identity and authentication',
      icon: <Lock className="h-5 w-5" />,
    },
    {
      title: 'TryHackMe - Network Security',
      url: 'https://tryhackme.com/',
      description: 'Practical cybersecurity training with safe, legal labs',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: 'SANS Institute Resources',
      url: 'https://www.sans.org/white-papers/',
      description: 'Free cybersecurity research and white papers',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: 'Cybrary - Free Cyber Security Training',
      url: 'https://www.cybrary.it/',
      description: 'Free online cybersecurity and IT training',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: 'NIST Cybersecurity Framework',
      url: 'https://www.nist.gov/cyberframework',
      description: 'Framework for improving critical infrastructure cybersecurity',
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Security Learning Hub</h1>
        <p className="text-muted-foreground">
          Learn about cybersecurity concepts, best practices, and ethical considerations
        </p>
      </div>

      {/* Legal Notice */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                Important Legal Notice
              </h3>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                This tool is for educational purposes only. Real wireless attacks without authorization 
                are illegal and can result in serious legal consequences. Always obtain proper permission 
                and follow applicable laws and institutional policies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
            <CardDescription>
              Common questions about Wi-Fi security and deauthentication attacks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Resources Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Learning Resources</span>
            </CardTitle>
            <CardDescription>
              Curated resources for cybersecurity education and best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="text-primary mt-0.5">{resource.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto mt-1"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Visit Resource
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices Section */}
      <Card>
        <CardHeader>
          <CardTitle>Wi-Fi Security Best Practices</CardTitle>
          <CardDescription>
            Essential steps to secure your wireless networks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Encryption</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use WPA3 when available</li>
                <li>• Avoid WEP and open networks</li>
                <li>• Use strong passphrases (20+ characters)</li>
                <li>• Enable enterprise security for business</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <span>Access Control</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Disable WPS</li>
                <li>• Use MAC address filtering</li>
                <li>• Implement guest networks</li>
                <li>• Regular access audits</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span>Monitoring</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Monitor connected devices</li>
                <li>• Check for unusual traffic</li>
                <li>• Update firmware regularly</li>
                <li>• Use network monitoring tools</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
