import { Component, afterNextRender } from '@angular/core';
import { createChat } from '@n8n/chat';


@Component({
  selector: 'app-n8n-chat',
  imports: [],
  templateUrl: './n8n-chat.html',
  styleUrl: './n8n-chat.css',
})
export class N8nChat {

constructor() {

  afterNextRender(() => {
    createChat({
      webhookUrl: 'https://giorgadze.app.n8n.cloud/webhook/da58e846-6389-4f04-b611-532d7e8b4902/chat',
      target: '#n8n-chat',
      mode: 'window',
      defaultLanguage:'en',        
      showWelcomeScreen: false,
      initialMessages: ['გამარჯობა! 👋', 'რით შემიძლია დაგეხმაროთ?'],
      i18n: {
        en: {
          title: 'თქვენი AI დამხმარე',
          subtitle: 'ყოველთვის მზად ვართ დახმარებისთვის!',
          getStarted: 'საუბრის დაწყება',
          inputPlaceholder: 'დაწერეთ კითხვა...',
          footer:'',
          closeButtonTooltip:'დახურვა' 
        }
      }
    });
  })

}



}
