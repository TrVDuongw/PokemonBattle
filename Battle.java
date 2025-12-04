public class Battle {
    public static void fight(Pokemon p1, Pokemon p2) {
        System.out.println("=== Trận đấu bắt đầu! ===");
        p1.showInfo();
        p2.showInfo();
        System.out.println();

        while (!p1.isFainted() && !p2.isFainted()) {
            p1.attack(p2);
            if (p2.isFainted()) break;
            p2.attack(p1);
            System.out.println();
        }

        if (p1.isFainted())
            System.out.println(p1.name + " đã gục ngã! " + p2.name + " chiến thắng!");
        else
            System.out.println(p2.name + " đã gục ngã! " + p1.name + " chiến thắng!");
    }
}
