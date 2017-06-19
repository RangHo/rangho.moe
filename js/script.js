/*global $*/

var terminal = {
    wnd: null,
    icon: null,
    container: null,
    status_bar: null,
    _maximized: false,
    _prevTop: null,
    _prevLeft: null,
    
    initialize: function() {
        $("#close").click(terminal.close);
        // open thing
        $("#maximize").click(terminal.maximize);
        $("#minimize").click(terminal.minimize);
        
        terminal.wnd = $(".terminal");
        terminal.icon = $(".icon");
        terminal.status_bar = $(".status-bar");
        terminal.container = $(".container");
    },
    
    close: function() {
        toggleDraggable.off();
    },
    
    open: function() {
        
    },
    
    maximize: function() {
        terminal.wnd.removeClass("minimize");
        terminal.status_bar.toggleClass("collapsed");
        terminal.container.toggleClass("fullscreen");
        terminal.wnd.toggleClass("maximize");
        toggleDraggable.toggle();
        terminal._togglePosition();
    },
    
    minimize: function() {
        toggleDraggable.on();
        terminal.wnd.removeClass("maximize");
        terminal.status_bar.removeClass("collapsed");
        terminal.container.removeClass("fullscreen");
        terminal.wnd.toggleClass("minimize");
    },
    
    _togglePosition: function() {
        if (terminal._maximized) {
            terminal.wnd.css("top", terminal._prevTop);
            terminal.wnd.css("left", terminal._prevLeft);
            terminal._maximized = false;
        } else {
            terminal._prevTop = terminal.wnd.css("top");
            terminal._prevLeft = terminal.wnd.css("left");
            terminal.wnd.removeAttr("style");
            terminal._maximized = true;
        }
    },
    
    keydown: function() {
        
    }
};

var toggleDraggable = {
    toggled: false,
    target: null,
    temp: null,
    
    init: function(target, grabbable) {
        toggleDraggable.target = $(target);
        toggleDraggable.target.draggable({
            handle: grabbable,
            containment: "parent",
            
            start: function() {
                toggleDraggable.temp = toggleDraggable.target.css("transition");
                toggleDraggable.target.css("transition", "none");
            },
            
            stop: function() {
                toggleDraggable.target.css("transition", toggleDraggable.temp);
            }
        });
        
        toggleDraggable.toggled = true;
    },
    
    toggle: function() {
        if (toggleDraggable.toggled) {
            toggleDraggable.target.draggable({ disabled: true });
            toggleDraggable.toggled = false;
        } else {
            toggleDraggable.target.draggable("enable");
            toggleDraggable.toggled = true;
        }
    },
    
    on: function() {
        toggleDraggable.target.draggable("enable");
        toggleDraggable.toggled = true;
    },
    
    off: function() {
        toggleDraggable.target.draggable({ disabled: true });
        toggleDraggable.toggled = false;
    }
};

$(document).ready(function() {
    toggleDraggable.init(".terminal", "#draggable");
    terminal.initialize();
});
