'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">capstone documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-58abd368b96c564499876aba07712385"' : 'data-target="#xs-components-links-module-AppModule-58abd368b96c564499876aba07712385"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-58abd368b96c564499876aba07712385"' :
                                            'id="xs-components-links-module-AppModule-58abd368b96c564499876aba07712385"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LobbyPageModule.html" data-type="entity-link">LobbyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LobbyPageModule-774572ae7cdeada4e8367ffa4771f2dd"' : 'data-target="#xs-components-links-module-LobbyPageModule-774572ae7cdeada4e8367ffa4771f2dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LobbyPageModule-774572ae7cdeada4e8367ffa4771f2dd"' :
                                            'id="xs-components-links-module-LobbyPageModule-774572ae7cdeada4e8367ffa4771f2dd"' }>
                                            <li class="link">
                                                <a href="components/LobbyPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LobbyPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' : 'data-target="#xs-components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' :
                                            'id="xs-components-links-module-LoginPageModule-eaf8e347e79c30f9afacdb036edbfec3"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuizPageModule.html" data-type="entity-link">QuizPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-QuizPageModule-0c591236b9ead0a46897efdc8f0e3ead"' : 'data-target="#xs-components-links-module-QuizPageModule-0c591236b9ead0a46897efdc8f0e3ead"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuizPageModule-0c591236b9ead0a46897efdc8f0e3ead"' :
                                            'id="xs-components-links-module-QuizPageModule-0c591236b9ead0a46897efdc8f0e3ead"' }>
                                            <li class="link">
                                                <a href="components/QuestionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuizPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuizPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-cb7ad11484173b17bf9ae6b057854463"' : 'data-target="#xs-components-links-module-SharedModule-cb7ad11484173b17bf9ae6b057854463"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-cb7ad11484173b17bf9ae6b057854463"' :
                                            'id="xs-components-links-module-SharedModule-cb7ad11484173b17bf9ae6b057854463"' }>
                                            <li class="link">
                                                <a href="components/QuestionItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link">Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab1PageModule-5b19a958e03b22acbe6f40065fb71e71"' : 'data-target="#xs-components-links-module-Tab1PageModule-5b19a958e03b22acbe6f40065fb71e71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-5b19a958e03b22acbe6f40065fb71e71"' :
                                            'id="xs-components-links-module-Tab1PageModule-5b19a958e03b22acbe6f40065fb71e71"' }>
                                            <li class="link">
                                                <a href="components/LobbyFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LobbyFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab1Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link">Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab2PageModule-cf8bcae99b2c9d72a212f2edd3ec23d9"' : 'data-target="#xs-components-links-module-Tab2PageModule-cf8bcae99b2c9d72a212f2edd3ec23d9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-cf8bcae99b2c9d72a212f2edd3ec23d9"' :
                                            'id="xs-components-links-module-Tab2PageModule-cf8bcae99b2c9d72a212f2edd3ec23d9"' }>
                                            <li class="link">
                                                <a href="components/QuestionFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab2Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link">Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab3PageModule-a4d8a6e7679fa53e0b113808156cfca7"' : 'data-target="#xs-components-links-module-Tab3PageModule-a4d8a6e7679fa53e0b113808156cfca7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-a4d8a6e7679fa53e0b113808156cfca7"' :
                                            'id="xs-components-links-module-Tab3PageModule-a4d8a6e7679fa53e0b113808156cfca7"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' : 'data-target="#xs-components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' :
                                            'id="xs-components-links-module-TabsPageModule-2e6139b3a3c561b39ce76f6d6856c021"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/QuizPage.html" data-type="entity-link">QuizPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DbService.html" data-type="entity-link">DbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuizService.html" data-type="entity-link">QuizService</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});