import { extend } from 'flarum/extend';
import { Post } from 'flarum/components/Post';
import { TextEditor } from 'flarum/components/TextEditor';
import Button from 'flarum/components/Button';

app.initializers.add('acme-private-content-private-tag', () => {
  extend(Post.prototype, 'oncreate', function() {
    this.$('.private-content[data-must-be-logged-in="true"]').each(function() {
      const $this = $(this);
      if (!app.session.user) {
        $this.hide();
      }
    });
  });

  extend(Post.prototype, 'onupdate', function() {
    this.$('.private-content[data-must-be-logged-in="true"]').each(function() {
      const $this = $(this);
      if (!app.session.user) {
        $this.hide();
      } else {
        $this.show(); // In caso di aggiornamento del post con utente loggato
      }
    });
  });

  extend(TextEditor.prototype, 'toolbarItems', function(items) {
    items.add(
      'private',
      Button.component({
        icon: 'fas fa-user-secret', // Scegli l'icona che preferisci
        title: app.translator.trans('acme-private-content.forum.private_tag_tooltip'),
        onclick: () => {
          const textarea = this.$('textarea')[0];
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const selectedText = textarea.value.substring(start, end);
          const replacement = `[private]${selectedText}[/private]`;
          textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
          // Aggiorna l'anteprima se presente
          $(textarea).trigger('input');
        },
      }),
      -10 // Posizione nella toolbar
    );
  });
});
