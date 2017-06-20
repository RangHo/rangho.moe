/*global $*/

var terminal = {
    wnd: null,
    icon: null,
    container: null,
    status_bar: null,
    _saved: false,
    _prevTop: null,
    _prevLeft: null,
    
    initialize: function() {
        $("#close").click(terminal.close);
        $("#maximize").click(terminal.maximize);
        $("#minimize").click(terminal.minimize);
        $(".icon").click(terminal.open);
        
        terminal.wnd = $(".terminal");
        terminal.icon = $(".icon");
        terminal.status_bar = $(".status-bar");
        terminal.container = $(".container");
    },
    
    close: function() {
        alert("")
    },
    
    open: function() {
        terminal.wnd.removeClass("minimize");
        terminal.icon.removeClass("show jump");
        terminal._restorePosition();
    },
    
    maximize: function() {
        terminal.status_bar.toggleClass("collapsed");
        terminal.container.toggleClass("fullscreen");
        terminal.wnd.toggleClass("maximize");
        toggleDraggable.toggle();
        terminal._togglePosition();
    },
    
    minimize: function() {
        terminal.wnd.removeClass("maximize");
        terminal.container.removeClass("fullscreen");
        terminal.status_bar.removeClass("collapsed");
        terminal.wnd.addClass("minimize");
        terminal.icon.addClass("show jump");
        terminal._savePosition();
    },
    
    _togglePosition: function() {
        if (terminal._saved) {
            terminal._restorePosition();
        } else {
            terminal._savePosition();
        }
    },
    
    _savePosition: function() {
        terminal._prevTop = terminal.wnd.css("top");
        terminal._prevLeft = terminal.wnd.css("left");
        terminal.wnd.removeAttr("style");
        terminal._saved = true;
    },
    
    _restorePosition: function() {
        terminal.wnd.css("top", terminal._prevTop);
        terminal.wnd.css("left", terminal._prevLeft);
        terminal._saved = false;
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
