/* eslint-disable max-len */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '@comp/Video';
import { Button } from '@comp/Button';
import { Header } from '@comp/Header';
import { AboutFeature } from '@comp/AboutFeature';

const features = [{
  title: 'Boards',
  description: ['Является основным строительным блоком вашего планирования. Внутри себя может содержать колонки/заголовки/todo и sub todo.', 'Для раскрытия всего функционала досок посмотрите видео и описание ниже.'],
  videoSrc: '/assets/videos/1.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Columns',
  description: ['С помощью столбиков можно группировать целые блоки задач. Колонки могут содержать todo или заголовки.', 'Чтобы узнать все возможности колонок ознакомьтесь с нашей презентацией ниже.'],
  videoSrc: '/assets/videos/2.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Headings',
  description: ['Большие списки сильно усложняют восприятие. Чтобы избежать этого используйте заголовки. С их помощью можно создать определенную структуру.', 'Как пример, в них можно хранить категории, названия этапов, версионность или что-то ещё.'],
  videoSrc: '/assets/videos/3.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Todos',
  description: ['Самый распространенный блок с которым вам придется работать. Это карточка, которая отображает какую-то задачу для выполнения.', 'О дополнительных возможностях карточки рассказано ниже.'],
  videoSrc: '/assets/videos/4.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Work Status',
  description: ['Verticals имеет больше состояний задач, чем много других аналогичных продуктов, которые имеют только статусы <b>To Do</b> и <b>Done</b>. С помощью статусов вы можете контроллировать прогресс выполнения каждой todo или sub todo.', 'Всего есть 4 статуса: <b>To do</b>, <b>Doing</b>, <b>Canceled</b>, <b>Done</b>.'],
  videoSrc: '/assets/videos/5.mp4',
  iconSrc: '/assets/svg/menu/rounded-square-half-filled.svg',
}, {
  title: 'Sub Todos',
  description: ['Это своего рода подзадачи, которые необходимо выполнить для реализации какой-то большой задачи. Хоть и рекомендуется хранить большие задачи в заголовке или даже колонке, но иногда этого мало и на помощь приходят sub todo', 'Вы можете использовать sub todo, как чек-лист для своей задачи.'],
  videoSrc: '/assets/videos/6.mp4',
  iconSrc: '/assets/svg/board/file.svg',
}, {
  title: 'Board Color',
  description: ['Не секрет, что выделение чего-то цветом помогает в восприятии информации.', 'Вы можете выделять доски любым понравившемся вам цветом, чтобы сфокусировать своё внимание на доске.'],
  videoSrc: '/assets/videos/7.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Column Color',
  description: ['Колонки тоже можно выделять цветом. Цвет применяется не ко всему столбцу, а только к его верхней части.', 'Таким образом это не будет мешать и отвлекать вас при работе с содержимым колонки.'],
  videoSrc: '/assets/videos/8.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Heading Color',
  description: ['Как и колонки, заголовки тоже позволяют помечать себя цветом. Для удобвства использования у заголовка помечается цветом только верхняя часть, чтобы не забирать на себя слишком много внимания при работе с задачами в заголовке.', ''],
  videoSrc: '/assets/videos/9.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Todo Color',
  description: ['Задачи можно так же помечать цветом, как и заголовки, это удобно, когда, к примеру, вам нужно сфокусировать всё своё внимание на выполнении конкретной задачи.', 'Используются не очень насыщенные цвета, чтобы не фокусировать внимание лишь на цвете.'],
  videoSrc: '/assets/videos/10.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Sub Todo Color',
  description: ['Sub todo это прямой аналог todo рассмотренного выше, поэтому для sub todo тоже имеется возможность использовать цвета.', 'Используются не очень насыщенные цвета, чтобы не фокусировать внимание лишь на цвете.'],
  videoSrc: '/assets/videos/11.mp4',
  iconSrc: '/assets/svg/board/light-bulb.svg',
}, {
  title: 'Board Icon',
  description: ['Чтобы улучшить узнаваемость досок мы можем выделять их цветом, давать уникальные имена, менять их позиции. Но ничто так не позволяет зацепиться глазу, как уникальной иконке. Именно поэтому для досок есть иконки.', 'По умолчанию они одинаковые, но если есть необходимость, то вы можете легко изменить иконку по своему вкусу или выбрать ту иконку, котоаря лучше всего описывает вашу доску.'],
  videoSrc: '/assets/videos/12.mp4',
  iconSrc: '/assets/svg/logo.svg',
}, {
  title: 'Card Style',
  description: ['Не всегда для работы с задачами нам нужны классические чекбоксы. Иногда у нас бывают просто списки задач, которые нам нужно просто перемещать между колонками/заголовками. В таком случае можно использовать другой стиль карточек.', 'Стиль карточек применяется ко всем todo и sub todo относящиеся к этой доске.'],
  videoSrc: '/assets/videos/13.mp4',
  iconSrc: '/assets/svg/menu/rect.svg',
}, {
  title: 'Minimize Column',
  description: ['Для того, чтобы получить более чистый и лишенный ненужных данных UX вы можете свернуть те колонки, которые не нужны вам на текущий момент. В свернутой колонке отображается название колонки и количеству задач, которые она содержит.', 'Свернутые колонки легче упорядочивать при смене позиций.'],
  videoSrc: '/assets/videos/14.mp4',
  iconSrc: '/assets/svg/menu/dash.svg',
}, {
  title: 'Minimize Heading',
  description: ['Если вы сейчас не работаете над конкретным заголовоком и его содержимое для вас сейчас не интересно, то вы можете свернуть его, чтобы он не занимал слишком много места.', 'В свернутом состоянии заголовок выглядит как todo и на нем отображено количество вложенных todo & название заголовка.'],
  videoSrc: '/assets/videos/15.mp4',
  iconSrc: '/assets/svg/menu/dash.svg',
}, {
  title: 'Reverse Columns',
  description: ['Иногда может быть полезно инвертировать порядок колонок внутри доски. Для этого просто нажмите соответствующую кнопку в контекстном меню.', 'Чтобы применить обратную операцию по реверсу порядка колонок выполните это действие снова.'],
  videoSrc: '/assets/videos/16.mp4',
  iconSrc: '/assets/svg/menu/reverse.svg',
}, {
  title: 'Recycle Bin',
  description: ['При удалении карточки она не удаляется безвозвратно, а просто переносится в корзину. Это полезно, когда вы случайно удалили карточку или после удаления вы решили, что она вам нужна.', 'Таким образом вся информация по карточке, включая комментарии и вложения можно восстановить в один клик.'],
  videoSrc: '/assets/videos/17.mp4',
  iconSrc: '/assets/svg/menu/remove.svg',
}, {
  title: 'Boards Moving',
  description: ['Необходимый порядок досок не всегда совпадает с тем порядком, в котором мы их создаем. Кроме того иногда могут измениться приоритеты и некоторые доски должны подняться в списке, либо опуститься вниз.', 'Для изменения порядка просто зажмите и перетащите доску на целевую позицию.'],
  videoSrc: '/assets/videos/18.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Columns Moving',
  description: ['Если вы используете колонки для учёта спринтов, то необходимости в перегруппировке колонок может и не быть. Но если колонки никак не связаны между собой и представляют один достаточно большой блок работ, то в таком случае упорядочивание позиций может стать очень полезным.', 'Зажмите верхнюю часть колонки и перетащите колонку на целевое место.'],
  videoSrc: '/assets/videos/19.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Headings Moving',
  description: ['Заголовки, как и колонки можно перетаскивать. Используйте эту возможность для того, чтобы правильно расставлять свои приоритеты в задачах и быть максимально продуктивным в процессе работы над блоком задач.', 'Для перемещения нужно зажать верхнюю часть заголовка и перетащить на необходимую позицию.'],
  videoSrc: '/assets/videos/20.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Todo Moving',
  description: ['Задачи время от времени нужно группировать и выставлять приоритетные задачи наверх списка. С течением времени приоритеты могут изменяться и поэтому очень необходимо иметь возможность перемещать задачи.', 'Перемещение доступно внутри колонки/заголовка или даже между ними. Просто нажмите и перетащите задачу на нужное место.'],
  videoSrc: '/assets/videos/21.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Sub Todo Moving',
  description: ['Sub todo представляет собой маленькую часть на пути к выполнению задачи. И правильное выполнение подзадач может быстрее привести к завершению работы над задачей в целом.', 'Поэтому изменение позиций подзадач из чек-листа играет важную роль в процессе планирования подходов к решению конкретной задачи.'],
  videoSrc: '/assets/videos/22.mp4',
  iconSrc: '/assets/svg/menu/duplicate.svg',
}, {
  title: 'Deadlines',
  description: ['Просто поставить перед собой задачу недостаточно. Если не оценивать сроки выполнения задачи, то эта задача может не выполняться длительный промежуток времени. И в таком случае весь процесс планирования сходит на нет.', 'Используйте умный календарь для выбора дат. Вы можете описать простыми словами когда наступит deadline и дата подставится автоматически.'],
  videoSrc: '/assets/videos/23.mp4',
  iconSrc: '/assets/svg/calendar.svg',
}, {
  title: 'Archives',
  description: ['Некоторые задачи могут утратить приоритет, но, возможно, к ним все же придется вернуться через какой-то промежуток времени.', 'В таком случае лучше не удалять карточку насовсем или перемещать ее в корзину. Вместо этого просто архивируйте карточку и она переместится в архивный список внутри колонки.'],
  videoSrc: '/assets/videos/24.mp4',
  iconSrc: '/assets/svg/menu/archive.svg',
}, {
  title: 'Comments & Attachments',
  description: ['Для хорошей и продуктивной коммуникации между членами команды нужно место, где задачу можно обсудить. Добавить необходимые материалы для выполнения.', 'Это могут быть картинки, файлы любого расширения и текстовые комментарии, которые поддерживают Markdown формат, о котором речь пойдет ниже.'],
  videoSrc: '/assets/videos/25.mp4',
  iconSrc: '/assets/svg/bubble.svg',
}, {
  title: 'Preview & Gallery',
  description: ['Карточки позволяют прикреплять к ним комментарии, различные файлы и картинки. И порой не очень удобно постоянно открывать попап с комментариями к карточке, чтобы увидеть все вложения.', 'С помощью продемонстрированной в видео функции вы можете мгновенно просматривать все вложения, без необходимости открытия попапа комментариев к карточке.'],
  videoSrc: '/assets/videos/26.mp4',
  iconSrc: '/assets/svg/gallery.svg',
}, {
  title: 'Markdown Support',
  description: ['Очень часто доски используются программистами, которым довольно часто приходится сталкиваться с Markdown форматом. Verticals поддерживает такую возможность для комментариев. Вы можете с легкостью форматировать свой текст, вставлять кусочки кода, рисовать таблицы и многое другое.', 'Больше информации можно найти на попапе с помощью по форматированию текста.'],
  videoSrc: '/assets/videos/27.mp4',
  iconSrc: '/assets/svg/board/rocket.svg',
}, {
  title: 'Column Width',
  description: ['Если названия карточек имеют очень большую длину, то в таком случае ширину колонки можно увеличить, чтобы не занимать много места в высоту и не было необходимости в дополнительной прокрутке..', ' Просто наведите курсор между колонками, чтобы появился характерный указатель изменения размера и перетащите его до того размера, который необходим для комфортной работы с колонкой.'],
  videoSrc: '/assets/videos/28.mp4',
  iconSrc: '/assets/svg/menu/edit.svg',
}, {
  title: 'Flexible Sidebar',
  description: ['При работе на устройстве с небольшим разрешением правильнее использовать всё пространство для отображение того, что действительно важно', ' Переключение между досками и другие функции, которые находятся на сайдбаре используются не часто и поэтому сайдбар при необходимости можно скрыть.'],
  videoSrc: '/assets/videos/29.mp4',
  iconSrc: '/assets/svg/menu/hide-sidebar.svg',
}, {
  title: 'Search',
  description: ['Для удобного поиска по названиям задач вы можете использовать поиск. Поиск происходит сразу по всем доскам/столбцам/заголовкам. После поиска вы можете посмотреть сколько совпадений было найдено для каждой доски.', 'Названия колонок/заголовков и sub todo не входят в результаты поиска. Только заголовки todo.'],
  videoSrc: '/assets/videos/30.mp4',
  iconSrc: '/assets/svg/board/search.svg',
}];

export const About: FC = () => (
  <div className="about">
    <div className="about__block about__block--gray">
      <div className="about__wrapper">
        <Header />
        <div className="about__block-first">
          <h1>
            Vertically ordered checklists
          </h1>
          <div className="about__block-first-inner">
            <h5>
              Great for planning and organizing work, educational process.
              Write better.
              Think more clearly.
              Get organized.
              Try it yourself 👌
            </h5>
            <Link to="/auth/register" className="link">
              <Button type="button" style={{ width: 200 }}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="about__block">
      <div className="about__wrapper">
        <div className="about__block-second">
          <Video
            src="/assets/videos/21.mp4"
            style={{
              transform: 'translateY(-120px)',
            }}
          />
          <h2>Value & Goal of this tool 🚀</h2>
          <h3>
            Any planning is difficult to complete, especially if it involves a lot of tasks.
            A large number of people neglect planning and scheduling their tasks,
            goals, plans for the next day, week or even years.
            Be better than them and plan your time.
          </h3>
          <h3>
            Using the beautiful and intuitive interface,
            where there is nothing superfluous, it is very easy to organize your workspace for carrying out tasks.
            Try it yourself!
          </h3>
        </div>
      </div>
    </div>

    {features.map(({
      title, videoSrc, iconSrc, description,
    }, index) => (
      <AboutFeature
        key={title}
        title={title}
        videoSrc={videoSrc}
        iconSrc={iconSrc}
        isReversed={index % 2 === 0}
      >
        {description.map((row: string) => (<p key={row} dangerouslySetInnerHTML={{ __html: row }} />))}
      </AboutFeature>
    ))}

    <div className="about__block">
      <div className="about__wrapper">
        <div className="about__block-footer">
          <h2 style={{ fontSize: 60, letterSpacing: -2 }}>Write, plan, and get organized 😎</h2>
          <h3>One tool for everything you need.</h3>
          <Link to="/auth/register" className="link">
            <Button modificator="primary" type="button" style={{ width: 200, marginTop: 40 }}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <div className="about__contacts">
      2021&nbsp;by&nbsp;
      <a href="https://github.com/xom9ikk" target="_blank">@xom9ikk</a>
    </div>
  </div>
);
