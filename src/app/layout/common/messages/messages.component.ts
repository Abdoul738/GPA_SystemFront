import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'app/layout/common/messages/messages.types';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariableServiceService } from 'app/variable-service.service';

@Component({
    selector       : 'messages',
    templateUrl    : './messages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'messages'
})
export class MessagesComponent implements OnInit, OnDestroy
{
    @ViewChild('messagesOrigin') private _messagesOrigin: MatButton;
    @ViewChild('messagesPanel') private _messagesPanel: TemplateRef<any>;

    // messages: Message[];
    messages:any;
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    usr_role_id:any = localStorage.getItem('usr_role');
    displayButton:any;

    /**
     * Constructor
     */
    constructor(
        private param: VariableServiceService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _messagesService: MessagesService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private http: HttpClient,
    )
    {
        this.displayButton = true;
        if(this.usr_role_id != 1){
            this.displayButton = false;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        this.http.get(this.param.url+'/getbesoins').subscribe(data=>{
            this.messages = data;

            // Calculate the unread count
            this._calculateUnreadCount();

            // Mark for check
            this._changeDetectorRef.markForCheck();
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if ( this._overlayRef )
        {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the messages panel
     */
    openPanel(): void
    {
        // Return if the messages panel or its origin is not defined
        if ( !this._messagesPanel || !this._messagesOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._messagesPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
        this._messagesService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given message
     */
    validerBesoin(id): void
    {
        this.http.get(this.param.url+'/validbesoins/'+id).subscribe(data => {
            this.ngOnInit();
        });
    }

    rejeterBesoin(id): void
    {
        this.http.get(this.param.url+'/rejetbesoins/'+id).subscribe(data => {
            this.ngOnInit();
        });
    }

    /**
     * Delete the given message
     */
    delete(message: Message): void
    {
        // Delete the message
        this._messagesService.delete(message.id).subscribe();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._messagesOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void
    {
        let count = 0;

        if ( this.messages && this.messages.length )
        {
            count = this.messages.filter(messages => messages.validstatut == 0 && messages.rejetstatut == 0 ).length;
        }

        this.unreadCount = count;
    }
}
