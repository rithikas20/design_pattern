export type PatternCategory = 'Creational' | 'Structural' | 'Behavioral';

export interface DesignPattern {
  id: string;
  name: string;
  category: PatternCategory;
  intent: string;
  description: string;
  mermaidCode: string;
  codeExample: string;
}

export const patterns: DesignPattern[] = [
  // Creational
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    intent: 'Ensure a class only has one instance, and provide a global point of access to it.',
    description: 'The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance. It is useful when exactly one object is needed to coordinate actions across the system.',
    mermaidCode: `classDiagram
  class Singleton {
    -static instance: Singleton
    -Singleton()
    +static getInstance(): Singleton
    +doSomething()
  }
  Singleton --> Singleton : returns instance`,
    codeExample: `class Database {
    private static Database instance;

    private Database() {
        // Private constructor to prevent direct instantiation
    }

    public static Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

public class Main {
    public static void main(String[] args) {
        Database db1 = Database.getInstance();
        Database db2 = Database.getInstance();
        System.out.println(db1 == db2); // true
    }
}`
  },
  {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'Creational',
    intent: 'Define an interface for creating an object, but let subclasses decide which class to instantiate.',
    description: 'Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.',
    mermaidCode: `classDiagram
  class Creator {
    <<abstract>>
    +factoryMethod() Product
    +someOperation()
  }
  class ConcreteCreatorA {
    +factoryMethod() Product
  }
  class ConcreteCreatorB {
    +factoryMethod() Product
  }
  class Product {
    <<interface>>
    +doStuff()
  }
  class ConcreteProductA {
    +doStuff()
  }
  class ConcreteProductB {
    +doStuff()
  }
  Creator <|-- ConcreteCreatorA
  Creator <|-- ConcreteCreatorB
  Product <|.. ConcreteProductA
  Product <|.. ConcreteProductB
  ConcreteCreatorA ..> ConcreteProductA : creates
  ConcreteCreatorB ..> ConcreteProductB : creates`,
    codeExample: `interface Transport {
    void deliver();
}

class Truck implements Transport {
    public void deliver() {
        System.out.println("Deliver by land in a box.");
    }
}

class Ship implements Transport {
    public void deliver() {
        System.out.println("Deliver by sea in a container.");
    }
}

abstract class Logistics {
    public abstract Transport createTransport();

    public void planDelivery() {
        Transport transport = this.createTransport();
        transport.deliver();
    }
}

class RoadLogistics extends Logistics {
    public Transport createTransport() {
        return new Truck();
    }
}

class SeaLogistics extends Logistics {
    public Transport createTransport() {
        return new Ship();
    }
}

public class Main {
    public static void main(String[] args) {
        Logistics roadLogistics = new RoadLogistics();
        roadLogistics.planDelivery();
    }
}`
  },
  {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'Creational',
    intent: 'Provide an interface for creating families of related or dependent objects without specifying their concrete classes.',
    description: 'Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.',
    mermaidCode: `classDiagram
  class AbstractFactory {
    <<interface>>
    +createProductA() AbstractProductA
    +createProductB() AbstractProductB
  }
  class ConcreteFactory1 {
    +createProductA() AbstractProductA
    +createProductB() AbstractProductB
  }
  class ConcreteFactory2 {
    +createProductA() AbstractProductA
    +createProductB() AbstractProductB
  }
  class AbstractProductA { <<interface>> }
  class AbstractProductB { <<interface>> }
  class ProductA1 { }
  class ProductB1 { }
  class ProductA2 { }
  class ProductB2 { }

  AbstractFactory <|.. ConcreteFactory1
  AbstractFactory <|.. ConcreteFactory2
  AbstractProductA <|.. ProductA1
  AbstractProductA <|.. ProductA2
  AbstractProductB <|.. ProductB1
  AbstractProductB <|.. ProductB2
  ConcreteFactory1 ..> ProductA1
  ConcreteFactory1 ..> ProductB1
  ConcreteFactory2 ..> ProductA2
  ConcreteFactory2 ..> ProductB2`,
    codeExample: `interface Button { void paint(); }
interface Checkbox { void paint(); }

class WinButton implements Button { public void paint() { System.out.println("Render a button in a Windows style."); } }
class MacButton implements Button { public void paint() { System.out.println("Render a button in a macOS style."); } }

class WinCheckbox implements Checkbox { public void paint() { System.out.println("Render a checkbox in a Windows style."); } }
class MacCheckbox implements Checkbox { public void paint() { System.out.println("Render a checkbox in a macOS style."); } }

interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class WinFactory implements GUIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}

class Application {
    private Button button;
    public Application(GUIFactory factory) { this.button = factory.createButton(); }
    public void paint() { this.button.paint(); }
}`
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    intent: 'Separate the construction of a complex object from its representation so that the same construction process can create different representations.',
    description: 'Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.',
    mermaidCode: `classDiagram
  class Builder {
    <<interface>>
    +buildPartA()
    +buildPartB()
    +buildPartC()
  }
  class ConcreteBuilder {
    -result: Product
    +buildPartA()
    +buildPartB()
    +buildPartC()
    +getResult() Product
  }
  class Director {
    -builder: Builder
    +construct()
  }
  class Product {
    +parts: List
  }
  Builder <|.. ConcreteBuilder
  Director o-- Builder
  ConcreteBuilder ..> Product : creates`,
    codeExample: `class Car {
    public int seats = 0;
    public String engine = "";
    public boolean tripComputer = false;
    public boolean gps = false;
}

interface Builder {
    void reset();
    void setSeats(int number);
    void setEngine(String engine);
    void setTripComputer(boolean hasTripComputer);
    void setGPS(boolean hasGPS);
}

class CarBuilder implements Builder {
    private Car car;
    public CarBuilder() { this.reset(); }
    public void reset() { this.car = new Car(); }
    public void setSeats(int number) { this.car.seats = number; }
    public void setEngine(String engine) { this.car.engine = engine; }
    public void setTripComputer(boolean hasTripComputer) { this.car.tripComputer = hasTripComputer; }
    public void setGPS(boolean hasGPS) { this.car.gps = hasGPS; }
    public Car getProduct() {
        Car product = this.car;
        this.reset();
        return product;
    }
}

class Director {
    public void constructSportsCar(Builder builder) {
        builder.reset();
        builder.setSeats(2);
        builder.setEngine("SportEngine");
        builder.setTripComputer(true);
        builder.setGPS(true);
    }
}`
  },
  {
    id: 'prototype',
    name: 'Prototype',
    category: 'Creational',
    intent: 'Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.',
    description: 'Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.',
    mermaidCode: `classDiagram
  class Prototype {
    <<interface>>
    +clone() Prototype
  }
  class ConcretePrototype1 {
    -field1
    +clone() Prototype
  }
  class ConcretePrototype2 {
    -field2
    +clone() Prototype
  }
  class Client {
    -operation()
  }
  Prototype <|.. ConcretePrototype1
  Prototype <|.. ConcretePrototype2
  Client --> Prototype : uses`,
    codeExample: `abstract class Shape implements Cloneable {
    public int x = 0;
    public int y = 0;
    public String color = "";

    public Shape() {}
    public Shape(Shape source) {
        if (source != null) {
            this.x = source.x;
            this.y = source.y;
            this.color = source.color;
        }
    }
    public abstract Shape clone();
}

class Circle extends Shape {
    public int radius = 0;
    public Circle() {}
    public Circle(Circle source) {
        super(source);
        if (source != null) this.radius = source.radius;
    }
    @Override
    public Shape clone() { return new Circle(this); }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle();
        circle.x = 10;
        circle.y = 20;
        circle.radius = 15;

        Circle anotherCircle = (Circle) circle.clone();
        System.out.println(anotherCircle.radius); // 15
    }
}`
  },

  // Structural
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'Structural',
    intent: "Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
    description: 'Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.',
    mermaidCode: `classDiagram
  class Target {
    <<interface>>
    +request()
  }
  class Adapter {
    -adaptee: Adaptee
    +request()
  }
  class Adaptee {
    +specificRequest()
  }
  class Client { }
  Target <|.. Adapter
  Adapter --> Adaptee
  Client --> Target`,
    codeExample: `class RoundHole {
    private double radius;
    public RoundHole(double radius) { this.radius = radius; }
    public double getRadius() { return this.radius; }
    public boolean fits(RoundPeg peg) { return this.getRadius() >= peg.getRadius(); }
}

class RoundPeg {
    private double radius;
    public RoundPeg() {}
    public RoundPeg(double radius) { this.radius = radius; }
    public double getRadius() { return this.radius; }
}

class SquarePeg {
    private double width;
    public SquarePeg(double width) { this.width = width; }
    public double getWidth() { return this.width; }
}

class SquarePegAdapter extends RoundPeg {
    private SquarePeg peg;
    public SquarePegAdapter(SquarePeg peg) {
        this.peg = peg;
    }
    @Override
    public double getRadius() {
        return this.peg.getWidth() * Math.sqrt(2) / 2;
    }
}

public class Main {
    public static void main(String[] args) {
        RoundHole hole = new RoundHole(5);
        RoundPeg rpeg = new RoundPeg(5);
        System.out.println(hole.fits(rpeg)); // true

        SquarePeg smallSqPeg = new SquarePeg(2);
        SquarePeg largeSqPeg = new SquarePeg(20);
        SquarePegAdapter smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
        SquarePegAdapter largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);

        System.out.println(hole.fits(smallSqPegAdapter)); // true
        System.out.println(hole.fits(largeSqPegAdapter)); // false
    }
}`
  },
  {
    id: 'bridge',
    name: 'Bridge',
    category: 'Structural',
    intent: 'Decouple an abstraction from its implementation so that the two can vary independently.',
    description: 'Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.',
    mermaidCode: `classDiagram
  class Abstraction {
    -implementation: Implementor
    +operation()
  }
  class RefinedAbstraction {
    +operation()
  }
  class Implementor {
    <<interface>>
    +operationImpl()
  }
  class ConcreteImplementorA {
    +operationImpl()
  }
  class ConcreteImplementorB {
    +operationImpl()
  }
  Abstraction o-- Implementor
  Abstraction <|-- RefinedAbstraction
  Implementor <|.. ConcreteImplementorA
  Implementor <|.. ConcreteImplementorB`,
    codeExample: `interface Device {
    boolean isEnabled();
    void enable();
    void disable();
    int getVolume();
    void setVolume(int percent);
}

class Tv implements Device {
    private boolean on = false;
    private int volume = 30;
    public boolean isEnabled() { return this.on; }
    public void enable() { this.on = true; }
    public void disable() { this.on = false; }
    public int getVolume() { return this.volume; }
    public void setVolume(int percent) { this.volume = percent; }
}

class RemoteControl {
    protected Device device;
    public RemoteControl(Device device) { this.device = device; }
    public void togglePower() {
        if (this.device.isEnabled()) this.device.disable();
        else this.device.enable();
    }
    public void volumeDown() { this.device.setVolume(this.device.getVolume() - 10); }
    public void volumeUp() { this.device.setVolume(this.device.getVolume() + 10); }
}

public class Main {
    public static void main(String[] args) {
        Tv tv = new Tv();
        RemoteControl remote = new RemoteControl(tv);
        remote.togglePower();
    }
}`
  },
  {
    id: 'composite',
    name: 'Composite',
    category: 'Structural',
    intent: 'Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.',
    description: 'Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.',
    mermaidCode: `classDiagram
  class Component {
    <<interface>>
    +operation()
    +add(Component)
    +remove(Component)
    +getChild(int)
  }
  class Leaf {
    +operation()
  }
  class Composite {
    -children: List~Component~
    +operation()
    +add(Component)
    +remove(Component)
    +getChild(int)
  }
  class Client { }
  Component <|.. Leaf
  Component <|.. Composite
  Composite o-- Component
  Client --> Component`,
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface Graphic {
    void move(int x, int y);
    void draw();
}

class Dot implements Graphic {
    protected int x, y;
    public Dot(int x, int y) { this.x = x; this.y = y; }
    public void move(int x, int y) { this.x += x; this.y += y; }
    public void draw() { System.out.println("Draw dot at " + this.x + "," + this.y); }
}

class Circle extends Dot {
    private int radius;
    public Circle(int x, int y, int radius) { super(x, y); this.radius = radius; }
    @Override
    public void draw() { System.out.println("Draw circle at " + this.x + "," + this.y + " with radius " + this.radius); }
}

class CompoundGraphic implements Graphic {
    private List<Graphic> children = new ArrayList<>();
    public void add(Graphic child) { this.children.add(child); }
    public void remove(Graphic child) { this.children.remove(child); }
    public void move(int x, int y) {
        for (Graphic child : this.children) child.move(x, y);
    }
    public void draw() {
        for (Graphic child : this.children) child.draw();
    }
}`
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'Structural',
    intent: 'Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
    description: 'Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.',
    mermaidCode: `classDiagram
  class Component {
    <<interface>>
    +operation()
  }
  class ConcreteComponent {
    +operation()
  }
  class Decorator {
    <<abstract>>
    -component: Component
    +operation()
  }
  class ConcreteDecoratorA {
    +operation()
  }
  class ConcreteDecoratorB {
    +operation()
  }
  Component <|.. ConcreteComponent
  Component <|.. Decorator
  Decorator o-- Component
  Decorator <|-- ConcreteDecoratorA
  Decorator <|-- ConcreteDecoratorB`,
    codeExample: `interface DataSource {
    void writeData(String data);
    String readData();
}

class FileDataSource implements DataSource {
    private String filename;
    private String data = "";
    public FileDataSource(String filename) { this.filename = filename; }
    public void writeData(String data) { this.data = data; }
    public String readData() { return this.data; }
}

class DataSourceDecorator implements DataSource {
    protected DataSource wrappee;
    public DataSourceDecorator(DataSource source) { this.wrappee = source; }
    public void writeData(String data) { this.wrappee.writeData(data); }
    public String readData() { return this.wrappee.readData(); }
}

class EncryptionDecorator extends DataSourceDecorator {
    public EncryptionDecorator(DataSource source) { super(source); }
    @Override
    public void writeData(String data) {
        String encrypted = "ENCRYPTED(" + data + ")";
        super.writeData(encrypted);
    }
    @Override
    public String readData() {
        String data = super.readData();
        return data.replace("ENCRYPTED(", "").replace(")", "");
    }
}

public class Main {
    public static void main(String[] args) {
        DataSource source = new FileDataSource("salary.dat");
        source = new EncryptionDecorator(source);
        source.writeData("Salary records");
        System.out.println(source.readData());
    }
}`
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'Structural',
    intent: 'Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.',
    description: 'Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.',
    mermaidCode: `classDiagram
  class Facade {
    +operation()
  }
  class SubsystemA {
    +operationA()
  }
  class SubsystemB {
    +operationB()
  }
  class SubsystemC {
    +operationC()
  }
  class Client { }
  Client --> Facade
  Facade --> SubsystemA
  Facade --> SubsystemB
  Facade --> SubsystemC`,
    codeExample: `class VideoFile { 
    public String name;
    public VideoFile(String name) { this.name = name; }
}
class OggCompressionCodec {}
class MPEG4CompressionCodec {}
class CodecFactory { public static Object extract(VideoFile file) { return "codec"; } }
class BitrateReader {
    public static Object read(String filename, Object codec) { return "buffer"; }
    public static Object convert(Object buffer, Object codec) { return "converted"; }
}
class AudioMixer { public Object fix(Object result) { return "fixed"; } }

class VideoConverter {
    public String convert(String filename, String format) {
        VideoFile file = new VideoFile(filename);
        Object sourceCodec = CodecFactory.extract(file);
        Object destinationCodec = format.equals("mp4") ? new MPEG4CompressionCodec() : new OggCompressionCodec();
        Object buffer = BitrateReader.read(filename, sourceCodec);
        Object result = BitrateReader.convert(buffer, destinationCodec);
        result = (new AudioMixer()).fix(result);
        return "File converted";
    }
}

public class Main {
    public static void main(String[] args) {
        VideoConverter converter = new VideoConverter();
        String mp4 = converter.convert("funny-cats-video.ogg", "mp4");
    }
}`
  },
  {
    id: 'flyweight',
    name: 'Flyweight',
    category: 'Structural',
    intent: 'Use sharing to support large numbers of fine-grained objects efficiently.',
    description: 'Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.',
    mermaidCode: `classDiagram
  class FlyweightFactory {
    -flyweights: Map
    +getFlyweight(key)
  }
  class Flyweight {
    <<interface>>
    +operation(extrinsicState)
  }
  class ConcreteFlyweight {
    -intrinsicState
    +operation(extrinsicState)
  }
  class UnsharedConcreteFlyweight {
    -allState
    +operation(extrinsicState)
  }
  class Client { }
  FlyweightFactory o-- Flyweight
  Flyweight <|.. ConcreteFlyweight
  Flyweight <|.. UnsharedConcreteFlyweight
  Client --> FlyweightFactory
  Client --> ConcreteFlyweight
  Client --> UnsharedConcreteFlyweight`,
    codeExample: `import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

class TreeType {
    private String name, color, texture;
    public TreeType(String name, String color, String texture) {
        this.name = name; this.color = color; this.texture = texture;
    }
    public void draw(Object canvas, int x, int y) {
        System.out.println("Draw " + this.name + " tree at " + x + "," + y);
    }
}

class TreeFactory {
    static Map<String, TreeType> treeTypes = new HashMap<>();
    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "-" + color + "-" + texture;
        if (!treeTypes.containsKey(key)) {
            treeTypes.put(key, new TreeType(name, color, texture));
        }
        return treeTypes.get(key);
    }
}

class Tree {
    private int x, y;
    private TreeType type;
    public Tree(int x, int y, TreeType type) { this.x = x; this.y = y; this.type = type; }
    public void draw(Object canvas) { this.type.draw(canvas, this.x, this.y); }
}

class Forest {
    private List<Tree> trees = new ArrayList<>();
    public void plantTree(int x, int y, String name, String color, String texture) {
        TreeType type = TreeFactory.getTreeType(name, color, texture);
        Tree tree = new Tree(x, y, type);
        this.trees.add(tree);
    }
    public void draw(Object canvas) {
        for (Tree tree : this.trees) tree.draw(canvas);
    }
}`
  },
  {
    id: 'proxy',
    name: 'Proxy',
    category: 'Structural',
    intent: 'Provide a surrogate or placeholder for another object to control access to it.',
    description: 'Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.',
    mermaidCode: `classDiagram
  class Subject {
    <<interface>>
    +request()
  }
  class RealSubject {
    +request()
  }
  class Proxy {
    -realSubject: RealSubject
    +request()
  }
  class Client { }
  Subject <|.. RealSubject
  Subject <|.. Proxy
  Proxy o-- RealSubject
  Client --> Subject`,
    codeExample: `import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
import java.util.List;

interface ThirdPartyYouTubeLib {
    List<String> listVideos();
    String getVideoInfo(String id);
}

class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    public List<String> listVideos() { return Arrays.asList("video1", "video2"); }
    public String getVideoInfo(String id) { return "Info about " + id; }
}

class CachedYouTubeClass implements ThirdPartyYouTubeLib {
    private ThirdPartyYouTubeLib service;
    private List<String> listCache = null;
    private Map<String, String> videoCache = new HashMap<>();

    public CachedYouTubeClass(ThirdPartyYouTubeLib service) { this.service = service; }

    public List<String> listVideos() {
        if (this.listCache == null) {
            this.listCache = this.service.listVideos();
        }
        return this.listCache;
    }

    public String getVideoInfo(String id) {
        if (!this.videoCache.containsKey(id)) {
            this.videoCache.put(id, this.service.getVideoInfo(id));
        }
        return this.videoCache.get(id);
    }
}

public class Main {
    public static void main(String[] args) {
        ThirdPartyYouTubeLib aYouTubeService = new ThirdPartyYouTubeClass();
        ThirdPartyYouTubeLib aYouTubeProxy = new CachedYouTubeClass(aYouTubeService);
        System.out.println(aYouTubeProxy.listVideos());
    }
}`
  },

  // Behavioral
  {
    id: 'chain-of-responsibility',
    name: 'Chain of Responsibility',
    category: 'Behavioral',
    intent: 'Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.',
    description: 'Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.',
    mermaidCode: `classDiagram
  class Handler {
    <<interface>>
    +setNext(Handler) Handler
    +handle(request)
  }
  class BaseHandler {
    <<abstract>>
    -next: Handler
    +setNext(Handler) Handler
    +handle(request)
  }
  class ConcreteHandler1 {
    +handle(request)
  }
  class ConcreteHandler2 {
    +handle(request)
  }
  class Client { }
  Handler <|.. BaseHandler
  BaseHandler o-- Handler
  BaseHandler <|-- ConcreteHandler1
  BaseHandler <|-- ConcreteHandler2
  Client --> Handler`,
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface ComponentWithContextualHelp {
    void showHelp();
}

abstract class Component implements ComponentWithContextualHelp {
    public String tooltipText = null;
    protected Container container = null;

    public void showHelp() {
        if (this.tooltipText != null) {
            System.out.println("Tooltip: " + this.tooltipText);
        } else if (this.container != null) {
            this.container.showHelp();
        }
    }
}

class Container extends Component {
    protected List<Component> children = new ArrayList<>();
    public void add(Component child) {
        this.children.add(child);
        child.container = this;
    }
}

class Button extends Component {}
class Panel extends Container {
    public String modalHelpText = null;
    @Override
    public void showHelp() {
        if (this.modalHelpText != null) {
            System.out.println("Modal Help: " + this.modalHelpText);
        } else {
            super.showHelp();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Panel panel = new Panel();
        panel.modalHelpText = "This panel does X.";
        Button ok = new Button();
        ok.tooltipText = "Submit the form.";
        Button cancel = new Button();
        panel.add(ok);
        panel.add(cancel);

        cancel.showHelp(); // Will fall back to panel's modalHelpText
    }
}`
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    intent: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
    description: "Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.",
    mermaidCode: `classDiagram
  class Command {
    <<interface>>
    +execute()
  }
  class ConcreteCommand {
    -receiver: Receiver
    -state
    +execute()
  }
  class Receiver {
    +action()
  }
  class Invoker {
    -command: Command
    +setCommand(Command)
    +executeCommand()
  }
  class Client { }
  Command <|.. ConcreteCommand
  ConcreteCommand --> Receiver
  Invoker o-- Command
  Client --> Invoker
  Client --> Receiver
  Client ..> ConcreteCommand : creates`,
    codeExample: `import java.util.ArrayList;
import java.util.List;

class Editor {
    public String text = "";
    public String getSelection() { return this.text; }
    public void deleteSelection() { this.text = ""; }
    public void replaceSelection(String text) { this.text = text; }
}

abstract class Command {
    protected String backup = "";
    public Application app;
    public Editor editor;
    public Command(Application app, Editor editor) { this.app = app; this.editor = editor; }
    public void saveBackup() { this.backup = this.editor.text; }
    public void undo() { this.editor.text = this.backup; }
    public abstract boolean execute();
}

class CopyCommand extends Command {
    public CopyCommand(Application app, Editor editor) { super(app, editor); }
    public boolean execute() {
        this.app.clipboard = this.editor.getSelection();
        return false;
    }
}

class PasteCommand extends Command {
    public PasteCommand(Application app, Editor editor) { super(app, editor); }
    public boolean execute() {
        this.saveBackup();
        this.editor.replaceSelection(this.app.clipboard);
        return true;
    }
}

class Application {
    public String clipboard = "";
    public List<Editor> editors = new ArrayList<>();
    public Editor activeEditor;
    public List<Command> history = new ArrayList<>();

    public Application() {
        this.editors.add(new Editor());
        this.activeEditor = this.editors.get(0);
    }

    public void executeCommand(Command command) {
        if (command.execute()) {
            this.history.add(command);
        }
    }
    public void undo() {
        if (!this.history.isEmpty()) {
            Command command = this.history.remove(this.history.size() - 1);
            command.undo();
        }
    }
}`
  },
  {
    id: 'iterator',
    name: 'Iterator',
    category: 'Behavioral',
    intent: 'Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.',
    description: 'Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).',
    mermaidCode: `classDiagram
  class Iterator {
    <<interface>>
    +getNext()
    +hasMore() boolean
  }
  class IterableCollection {
    <<interface>>
    +createIterator() Iterator
  }
  class ConcreteIterator {
    -collection: ConcreteCollection
    -iterationState
    +getNext()
    +hasMore() boolean
  }
  class ConcreteCollection {
    +createIterator() Iterator
  }
  class Client { }
  Iterator <|.. ConcreteIterator
  IterableCollection <|.. ConcreteCollection
  ConcreteCollection ..> ConcreteIterator : creates
  ConcreteIterator --> ConcreteCollection
  Client --> Iterator
  Client --> IterableCollection`,
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface Iterator<T> {
    T getNext();
    boolean hasMore();
}

interface IterableCollection<T> {
    Iterator<T> createIterator();
}

class WordsCollection implements IterableCollection<String> {
    private List<String> items = new ArrayList<>();
    public List<String> getItems() { return this.items; }
    public int getCount() { return this.items.size(); }
    public void addItem(String item) { this.items.add(item); }
    public Iterator<String> createIterator() {
        return new AlphabeticalOrderIterator(this, false);
    }
}

class AlphabeticalOrderIterator implements Iterator<String> {
    private WordsCollection collection;
    private int position = 0;
    private boolean reverse = false;

    public AlphabeticalOrderIterator(WordsCollection collection, boolean reverse) {
        this.collection = collection;
        this.reverse = reverse;
        if (reverse) this.position = collection.getCount() - 1;
    }

    public String getNext() {
        String item = this.collection.getItems().get(this.position);
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public boolean hasMore() {
        if (this.reverse) return this.position >= 0;
        return this.position < this.collection.getCount();
    }
}`
  },
  {
    id: 'mediator',
    name: 'Mediator',
    category: 'Behavioral',
    intent: 'Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.',
    description: 'Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.',
    mermaidCode: `classDiagram
  class Mediator {
    <<interface>>
    +notify(sender, event)
  }
  class ConcreteMediator {
    -component1: Component1
    -component2: Component2
    +notify(sender, event)
  }
  class BaseComponent {
    #mediator: Mediator
    +BaseComponent(Mediator)
  }
  class Component1 {
    +doA()
    +doB()
  }
  class Component2 {
    +doC()
    +doD()
  }
  Mediator <|.. ConcreteMediator
  BaseComponent o-- Mediator
  BaseComponent <|-- Component1
  BaseComponent <|-- Component2
  ConcreteMediator --> Component1
  ConcreteMediator --> Component2`,
    codeExample: `interface Mediator {
    void notify(Object sender, String event);
}

class AuthenticationDialog implements Mediator {
    public String title = "Auth";
    public Checkbox loginOrRegisterChkBx;
    public Textbox loginUsername;
    public Textbox loginPassword;
    public Button okBtn;

    public AuthenticationDialog() {
        this.loginOrRegisterChkBx = new Checkbox(this);
        this.loginUsername = new Textbox(this);
        this.loginPassword = new Textbox(this);
        this.okBtn = new Button(this);
    }

    public void notify(Object sender, String event) {
        if (sender == this.loginOrRegisterChkBx && event.equals("check")) {
            if (this.loginOrRegisterChkBx.checked) {
                this.title = "Log in";
            } else {
                this.title = "Register";
            }
        }
        if (sender == this.okBtn && event.equals("click")) {
            System.out.println("Submit form");
        }
    }
}

class Component {
    protected Mediator dialog;
    public Component(Mediator dialog) { this.dialog = dialog; }
    public void click() { this.dialog.notify(this, "click"); }
    public void keypress() { this.dialog.notify(this, "keypress"); }
}

class Button extends Component {
    public Button(Mediator dialog) { super(dialog); }
}
class Textbox extends Component {
    public Textbox(Mediator dialog) { super(dialog); }
}
class Checkbox extends Component {
    public boolean checked = false;
    public Checkbox(Mediator dialog) { super(dialog); }
    public void check() {
        this.checked = !this.checked;
        this.dialog.notify(this, "check");
    }
}`
  },
  {
    id: 'memento',
    name: 'Memento',
    category: 'Behavioral',
    intent: "Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.",
    description: 'Memento is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation.',
    mermaidCode: `classDiagram
  class Originator {
    -state
    +save() Memento
    +restore(Memento)
  }
  class Memento {
    <<interface>>
  }
  class ConcreteMemento {
    -state
    -date
    +getState()
    +getDate()
  }
  class Caretaker {
    -history: List~Memento~
    -originator: Originator
    +doSomething()
    +undo()
  }
  Memento <|.. ConcreteMemento
  Originator ..> ConcreteMemento : creates
  Caretaker o-- Memento
  Caretaker --> Originator`,
    codeExample: `class Editor {
    private String text = "";
    private int curX = 0;
    private int curY = 0;

    public void setText(String text) { this.text = text; }
    public void setCursor(int x, int y) { this.curX = x; this.curY = y; }
    
    public Snapshot createSnapshot() {
        return new Snapshot(this, this.text, this.curX, this.curY);
    }
}

class Snapshot {
    private Editor editor;
    private String text;
    private int curX;
    private int curY;

    public Snapshot(Editor editor, String text, int curX, int curY) {
        this.editor = editor;
        this.text = text;
        this.curX = curX;
        this.curY = curY;
    }

    public void restore() {
        this.editor.setText(this.text);
        this.editor.setCursor(this.curX, this.curY);
    }
}

class Command {
    private Snapshot backup = null;
    private Editor editor;
    public Command(Editor editor) { this.editor = editor; }
    
    public void makeBackup() {
        this.backup = this.editor.createSnapshot();
    }
    
    public void undo() {
        if (this.backup != null) {
            this.backup.restore();
        }
    }
}`
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    intent: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
    description: "Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.",
    mermaidCode: `classDiagram
  class Subject {
    <<interface>>
    +attach(Observer)
    +detach(Observer)
    +notify()
  }
  class ConcreteSubject {
    -state
    -observers: List~Observer~
    +attach(Observer)
    +detach(Observer)
    +notify()
    +getState()
    +setState()
  }
  class Observer {
    <<interface>>
    +update(Subject)
  }
  class ConcreteObserver {
    -subject: ConcreteSubject
    +update(Subject)
  }
  class Client { }
  Subject <|.. ConcreteSubject
  Observer <|.. ConcreteObserver
  ConcreteSubject o-- Observer
  ConcreteObserver --> ConcreteSubject
  Client --> Subject
  Client --> Observer`,
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(Subject subject);
}

interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

class WeatherStation implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int temperature = 0;

    public void attach(Observer observer) {
        if (!this.observers.contains(observer)) {
            this.observers.add(observer);
        }
    }

    public void detach(Observer observer) {
        this.observers.remove(observer);
    }

    public void notifyObservers() {
        for (Observer observer : this.observers) {
            observer.update(this);
        }
    }

    public void setTemperature(int temp) {
        this.temperature = temp;
        this.notifyObservers();
    }

    public int getTemperature() {
        return this.temperature;
    }
}

class PhoneDisplay implements Observer {
    public void update(Subject subject) {
        if (subject instanceof WeatherStation) {
            System.out.println("PhoneDisplay: Temperature updated to " + ((WeatherStation) subject).getTemperature() + "°C");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        PhoneDisplay phoneDisplay = new PhoneDisplay();

        station.attach(phoneDisplay);
        station.setTemperature(25);
        station.setTemperature(30);
    }
}`
  },
  {
    id: 'state',
    name: 'State',
    category: 'Behavioral',
    intent: 'Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.',
    description: 'State is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.',
    mermaidCode: `classDiagram
  class Context {
    -state: State
    +Context(State)
    +changeState(State)
    +request()
  }
  class State {
    <<interface>>
    +handle()
  }
  class ConcreteStateA {
    +handle()
  }
  class ConcreteStateB {
    +handle()
  }
  Context o-- State
  State <|.. ConcreteStateA
  State <|.. ConcreteStateB`,
    codeExample: `class AudioPlayer {
    public State state;
    public boolean playing = false;
    
    public AudioPlayer() {
        this.state = new ReadyState(this);
    }
    
    public void changeState(State state) { this.state = state; }
    public void clickPlay() { this.state.clickPlay(); }
    public void clickNext() { this.state.clickNext(); }
    public void clickPrevious() { this.state.clickPrevious(); }
}

abstract class State {
    protected AudioPlayer player;
    public State(AudioPlayer player) { this.player = player; }
    public abstract void clickPlay();
    public abstract void clickNext();
    public abstract void clickPrevious();
}

class ReadyState extends State {
    public ReadyState(AudioPlayer player) { super(player); }
    public void clickPlay() {
        this.player.playing = true;
        this.player.changeState(new PlayingState(this.player));
    }
    public void clickNext() { System.out.println("Next song"); }
    public void clickPrevious() { System.out.println("Previous song"); }
}

class PlayingState extends State {
    public PlayingState(AudioPlayer player) { super(player); }
    public void clickPlay() {
        this.player.playing = false;
        this.player.changeState(new ReadyState(this.player));
    }
    public void clickNext() { System.out.println("Next song"); }
    public void clickPrevious() { System.out.println("Previous song"); }
}`
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    intent: 'Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.',
    description: 'Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.',
    mermaidCode: `classDiagram
  class Context {
    -strategy: Strategy
    +setStrategy(Strategy)
    +executeStrategy()
  }
  class Strategy {
    <<interface>>
    +execute(data)
  }
  class ConcreteStrategyA {
    +execute(data)
  }
  class ConcreteStrategyB {
    +execute(data)
  }
  class Client { }
  Context o-- Strategy
  Strategy <|.. ConcreteStrategyA
  Strategy <|.. ConcreteStrategyB
  Client --> Context
  Client --> Strategy`,
    codeExample: `interface RouteStrategy {
    void buildRoute(String A, String B);
}

class RoadStrategy implements RouteStrategy {
    public void buildRoute(String A, String B) {
        System.out.println("Road route from " + A + " to " + B);
    }
}

class WalkingStrategy implements RouteStrategy {
    public void buildRoute(String A, String B) {
        System.out.println("Walking route from " + A + " to " + B);
    }
}

class PublicTransportStrategy implements RouteStrategy {
    public void buildRoute(String A, String B) {
        System.out.println("Public transport route from " + A + " to " + B);
    }
}

class Navigator {
    private RouteStrategy routeStrategy;
    
    public Navigator(RouteStrategy strategy) {
        this.routeStrategy = strategy;
    }
    
    public void setStrategy(RouteStrategy strategy) {
        this.routeStrategy = strategy;
    }
    
    public void buildRoute(String A, String B) {
        this.routeStrategy.buildRoute(A, B);
    }
}

public class Main {
    public static void main(String[] args) {
        Navigator navigator = new Navigator(new RoadStrategy());
        navigator.buildRoute("Home", "Work");
        navigator.setStrategy(new WalkingStrategy());
        navigator.buildRoute("Home", "Park");
    }
}`
  },
  {
    id: 'template-method',
    name: 'Template Method',
    category: 'Behavioral',
    intent: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.",
    description: 'Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.',
    mermaidCode: `classDiagram
  class AbstractClass {
    <<abstract>>
    +templateMethod()
    #step1()
    #step2()
    #step3()
  }
  class ConcreteClass1 {
    #step1()
    #step2()
  }
  class ConcreteClass2 {
    #step1()
    #step2()
    #step3()
  }
  AbstractClass <|-- ConcreteClass1
  AbstractClass <|-- ConcreteClass2`,
    codeExample: `import java.util.Collections;
import java.util.List;

abstract class GameAI {
    public void turn() {
        this.collectResources();
        this.buildStructures();
        this.buildUnits();
        this.attack();
    }
    
    public void collectResources() {
        for (Object s : this.builtStructures()) {
            // s.collect();
        }
    }
    
    public abstract void buildStructures();
    public abstract void buildUnits();
    
    public void attack() {
        Object enemy = this.closestEnemy();
        if (enemy != null) {
            this.sendScouts("10,10");
            this.sendWarriors("10,10");
        }
    }
    
    public abstract void sendScouts(String position);
    public abstract void sendWarriors(String position);
    
    // Mock methods
    public List<Object> builtStructures() { return Collections.emptyList(); }
    public Object closestEnemy() { return new Object(); }
}

class OrcsAI extends GameAI {
    public void buildStructures() { System.out.println("Build orc structures"); }
    public void buildUnits() { System.out.println("Build orc units"); }
    public void sendScouts(String position) { System.out.println("Send orc scouts"); }
    public void sendWarriors(String position) { System.out.println("Send orc warriors"); }
}`
  },
  {
    id: 'visitor',
    name: 'Visitor',
    category: 'Behavioral',
    intent: 'Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.',
    description: 'Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.',
    mermaidCode: `classDiagram
  class Visitor {
    <<interface>>
    +visitElementA(ElementA)
    +visitElementB(ElementB)
  }
  class ConcreteVisitor1 {
    +visitElementA(ElementA)
    +visitElementB(ElementB)
  }
  class ConcreteVisitor2 {
    +visitElementA(ElementA)
    +visitElementB(ElementB)
  }
  class Element {
    <<interface>>
    +accept(Visitor)
  }
  class ElementA {
    +accept(Visitor)
    +featureA()
  }
  class ElementB {
    +accept(Visitor)
    +featureB()
  }
  class Client { }
  Visitor <|.. ConcreteVisitor1
  Visitor <|.. ConcreteVisitor2
  Element <|.. ElementA
  Element <|.. ElementB
  Client --> Visitor
  Client --> Element`,
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface Shape {
    void move(int x, int y);
    void draw();
    void accept(Visitor v);
}

class Dot implements Shape {
    public void move(int x, int y) {}
    public void draw() {}
    public void accept(Visitor v) { v.visitDot(this); }
}

class Circle implements Shape {
    public void move(int x, int y) {}
    public void draw() {}
    public void accept(Visitor v) { v.visitCircle(this); }
}

interface Visitor {
    void visitDot(Dot d);
    void visitCircle(Circle c);
}

class XMLExportVisitor implements Visitor {
    public void visitDot(Dot d) {
        System.out.println("Export dot to XML");
    }
    public void visitCircle(Circle c) {
        System.out.println("Export circle to XML");
    }
}

public class Main {
    public static void main(String[] args) {
        List<Shape> shapes = new ArrayList<>();
        shapes.add(new Dot());
        shapes.add(new Circle());
        
        Visitor exportVisitor = new XMLExportVisitor();
        
        for (Shape shape : shapes) {
            shape.accept(exportVisitor);
        }
    }
}`
  }
];
